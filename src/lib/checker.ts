import type { Env } from 'src/worker'
import { z } from 'zod'

const viPlanSchema = z.object({
  PROMOTION_TITLE: z.string(),
  READ_MORE: z.string(),
  DATA_LINE_1: z.string(),
})

export async function hasUnlimitedDataPlan(env: Env): Promise<boolean> {
  const res = await fetch(env.VI_API_URL)
  const json = await res.json()
  if (!Array.isArray(json)) return false
  return json.some(plan => {
    const safe = viPlanSchema.safeParse(plan)
    if (!safe.success) return false
    const { PROMOTION_TITLE, READ_MORE, DATA_LINE_1 } = safe.data

    const title = PROMOTION_TITLE.toLowerCase()
    const readMore = READ_MORE?.toLowerCase() ?? ''
    const dataLine = DATA_LINE_1?.toLowerCase() ?? ''

    const isUnlimited4G = title.includes('unlimited data')
    const isUnlimited5G = readMore.includes('unlimited 5g')
    const isFullDayUnlimited = readMore.includes('full day unlimited data')
    const isUnlimitedData = dataLine.includes('unlimited')

    return [isUnlimited4G, isUnlimited5G, isFullDayUnlimited, isUnlimitedData].some(Boolean)
  })
}
