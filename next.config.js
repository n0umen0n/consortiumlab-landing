const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next-build',
  output: 'export',
  images: { unoptimized: true },
})
