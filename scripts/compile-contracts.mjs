import fs from 'node:fs/promises'
import path from 'node:path'
import solc from 'solc'

const contractsDir = path.join(process.cwd(), 'contracts')

async function collectSolidityFiles(targetDir) {
  const entries = await fs.readdir(targetDir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(targetDir, entry.name)
      if (entry.isDirectory()) {
        return collectSolidityFiles(fullPath)
      }
      return entry.name.endsWith('.sol') ? [fullPath] : []
    }),
  )
  return files.flat()
}

const solidityFiles = await collectSolidityFiles(contractsDir)
const sources = Object.fromEntries(
  await Promise.all(
    solidityFiles.map(async (filePath) => {
      const relativePath = path.relative(process.cwd(), filePath).replaceAll(path.sep, '/')
      return [relativePath, { content: await fs.readFile(filePath, 'utf8') }]
    }),
  ),
)

const input = {
  language: 'Solidity',
  sources,
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode.object'],
      },
    },
  },
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))

if (output.errors?.length) {
  let hasError = false
  for (const diagnostic of output.errors) {
    const prefix = diagnostic.severity === 'error' ? 'ERROR' : 'WARN'
    console.log(`${prefix}: ${diagnostic.formattedMessage}`)
    if (diagnostic.severity === 'error') {
      hasError = true
    }
  }
  if (hasError) {
    process.exit(1)
  }
}

const compiledContracts = Object.entries(output.contracts ?? {}).flatMap(([fileName, contracts]) =>
  Object.keys(contracts).map((contractName) => `${fileName}:${contractName}`),
)

console.log(`Compiled ${compiledContracts.length} contracts`)
for (const contractName of compiledContracts) {
  console.log(`- ${contractName}`)
}
