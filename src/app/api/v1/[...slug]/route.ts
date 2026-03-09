import { NextRequest, NextResponse } from 'next/server'
import {
  acceptAgent,
  cancelTask,
  claimRewards,
  closeReputationCycle,
  createTask,
  createTrainingTask,
  finalizeRewardEpoch,
  getAgentByIdentity,
  getRewardsByWallet,
  getTaskById,
  getTrainingStatus,
  getWorkerById,
  parseStringArray,
  recordHeartbeat,
  registerWorker,
  removeAgent,
  submitRanking,
  submitReceipt,
  submitTrainingTask,
  verifyWorker,
  assignTask,
} from '@/lib/mvp/state'

export const dynamic = 'force-dynamic'

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

async function readJson(request: NextRequest) {
  try {
    return await request.json()
  } catch {
    return {}
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  const slug = params.slug ?? []

  if (slug[0] === 'workers' && slug.length === 2) {
    const worker = await getWorkerById(slug[1])
    return worker ? NextResponse.json(worker) : jsonError('Worker not found', 404)
  }

  if (slug[0] === 'workers' && slug[2] === 'training-status') {
    const trainingStatus = await getTrainingStatus(slug[1])
    return trainingStatus
      ? NextResponse.json(trainingStatus)
      : jsonError('Worker training status not found', 404)
  }

  if (slug[0] === 'agents' && slug.length === 3) {
    const agent = await getAgentByIdentity(slug[1], slug[2])
    return agent ? NextResponse.json(agent) : jsonError('Agent membership not found', 404)
  }

  if (slug[0] === 'tasks' && slug.length === 2) {
    const task = await getTaskById(slug[1])
    return task ? NextResponse.json(task) : jsonError('Task not found', 404)
  }

  if (slug[0] === 'rewards' && slug[1] === 'operators' && slug.length === 3) {
    return NextResponse.json(await getRewardsByWallet(slug[2]))
  }

  return jsonError('Unsupported GET endpoint', 404)
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  const slug = params.slug ?? []
  const body = await readJson(request)

  try {
    if (slug[0] === 'workers' && slug[1] === 'register') {
      return NextResponse.json(await registerWorker(body))
    }

    if (slug[0] === 'workers' && slug[1] === 'verify') {
      if (!body.workerId) return jsonError('workerId is required')
      return NextResponse.json(await verifyWorker(String(body.workerId)))
    }

    if (slug[0] === 'agents' && slug[1] === 'accept') {
      const { workerId, identityRegistry, agentId, operatorWallet } = body
      if (!workerId || !identityRegistry || !agentId || !operatorWallet) {
        return jsonError('workerId, identityRegistry, agentId, and operatorWallet are required')
      }
      return NextResponse.json(
        await acceptAgent(
          String(workerId),
          String(identityRegistry),
          String(agentId),
          String(operatorWallet),
        ),
      )
    }

    if (slug[0] === 'agents' && slug[1] === 'remove') {
      const { identityRegistry, agentId } = body
      if (!identityRegistry || !agentId) {
        return jsonError('identityRegistry and agentId are required')
      }
      return NextResponse.json(await removeAgent(String(identityRegistry), String(agentId)))
    }

    if (slug[0] === 'tasks' && slug.length === 1) {
      return NextResponse.json(
        await createTask({
          title: String(body.title ?? 'Untitled task'),
          stream: String(body.stream ?? 'General'),
          priority: body.priority ?? 'medium',
          lane: body.lane ?? 'operator_work',
          deliverable: String(body.deliverable ?? 'No deliverable supplied'),
          dueAt: String(body.dueAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()),
          assigneeWorkerId: body.assigneeWorkerId ? String(body.assigneeWorkerId) : undefined,
        }),
      )
    }

    if (slug[0] === 'tasks' && slug[2] === 'assign') {
      if (!body.workerId) return jsonError('workerId is required')
      return NextResponse.json(await assignTask(slug[1], String(body.workerId)))
    }

    if (slug[0] === 'tasks' && slug[2] === 'heartbeat') {
      return NextResponse.json(await recordHeartbeat(slug[1]))
    }

    if (slug[0] === 'tasks' && slug[2] === 'receipts') {
      return NextResponse.json(
        await submitReceipt(
          slug[1],
          String(body.summary ?? 'Receipt submitted'),
          parseStringArray(body.links),
        ),
      )
    }

    if (slug[0] === 'tasks' && slug[2] === 'cancel') {
      return NextResponse.json(await cancelTask(slug[1]))
    }

    if (slug[0] === 'training' && slug[1] === 'tasks' && slug.length === 2) {
      if (!body.workerId) return jsonError('workerId is required')
      return NextResponse.json(
        await createTrainingTask(
          String(body.workerId),
          String(body.title ?? 'Training task'),
          parseStringArray(body.checklist),
        ),
      )
    }

    if (slug[0] === 'training' && slug[1] === 'tasks' && slug[3] === 'submit') {
      return NextResponse.json(await submitTrainingTask(slug[2]))
    }

    if (slug[0] === 'reputation' && slug[1] === 'cycle' && slug[2] === 'close') {
      return NextResponse.json(await closeReputationCycle())
    }

    if (slug[0] === 'reputation' && slug[1] === 'rankings' && slug[2] === 'submit') {
      if (!body.rankerWorkerId) return jsonError('rankerWorkerId is required')
      return NextResponse.json(
        await submitRanking(String(body.rankerWorkerId), parseStringArray(body.rankedWorkers)),
      )
    }

    if (slug[0] === 'rewards' && slug[1] === 'epochs' && slug[3] === 'finalize') {
      const epochId = Number(slug[2])
      const emissionAmount = Number(body.emissionAmount ?? 0)
      if (Number.isNaN(epochId) || Number.isNaN(emissionAmount) || emissionAmount <= 0) {
        return jsonError('Valid epochId and emissionAmount are required')
      }
      return NextResponse.json(await finalizeRewardEpoch(epochId, emissionAmount))
    }

    if (slug[0] === 'rewards' && slug[1] === 'claims') {
      if (!body.wallet) return jsonError('wallet is required')
      return NextResponse.json(await claimRewards(String(body.wallet)))
    }

    return jsonError('Unsupported POST endpoint', 404)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown API error'
    return jsonError(message, 500)
  }
}
