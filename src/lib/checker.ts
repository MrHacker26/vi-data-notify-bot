import type { Env } from 'src/worker'
import { z } from 'zod'
import { fetchWithTimeout } from './fetch'
import { FETCH_TIMEOUT_MS } from './constants'

const viPlanSchema = z.object({
  UNIT_COST: z.string(),
  SERVICEVALIDITY_ATTR: z.string(),
  PROMOTION_TITLE: z.string(),
  READ_MORE: z.string(),
  DATA_LINE_1: z.string(),
})

type UnlimitedPlanResult = {
  hasUnlimitedPlan: boolean
  planDetails: string
}

export async function hasUnlimitedDataPlan(env: Env): Promise<UnlimitedPlanResult> {
  const res = await fetchWithTimeout(env.VI_API_URL, FETCH_TIMEOUT_MS)

  const json = await res.json()

  if (!Array.isArray(json)) {
    return {
      hasUnlimitedPlan: false,
      planDetails: '❌ No unlimited plans available',
    }
  }

  const unlimitedPlans: string[] = []

  json.forEach(plan => {
    const safe = viPlanSchema.safeParse(plan)

    if (!safe.success) {
      return
    }

    const { PROMOTION_TITLE, READ_MORE, DATA_LINE_1, UNIT_COST, SERVICEVALIDITY_ATTR } = safe.data

    const title = PROMOTION_TITLE.toLowerCase()
    const readMore = READ_MORE?.toLowerCase() ?? ''
    const dataLine = DATA_LINE_1?.toLowerCase() ?? ''

    const isUnlimited4G = title.includes('unlimited data')
    const isUnlimited5G = readMore.includes('unlimited 5g')
    const isFullDayUnlimited = readMore.includes('full day unlimited data')
    const isUnlimitedData = dataLine.includes('unlimited')

    const isUnlimited = [isUnlimited4G, isUnlimited5G, isFullDayUnlimited, isUnlimitedData].some(Boolean)

    if (isUnlimited) {
      const planInfo = `📋 *${PROMOTION_TITLE}*\n💰 Price: ₹${UNIT_COST}\n⏰ Validity: ${SERVICEVALIDITY_ATTR}`
      unlimitedPlans.push(planInfo)
    }
  })

  if (unlimitedPlans.length > 0) {
    return {
      hasUnlimitedPlan: true,
      planDetails: `🚨 *Unlimited Data Plans Available!*\n\n${unlimitedPlans.join('\n\n')}`,
    }
  }

  return {
    hasUnlimitedPlan: false,
    planDetails: '❌ No unlimited plans available',
  }
}
