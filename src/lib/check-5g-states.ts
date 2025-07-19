import type { Env } from 'src/worker'
import { z } from 'zod'
import { fetchWithTimeout } from './fetch'
import { FETCH_TIMEOUT_MS, MINIMUM_NEW_STATE_COUNT } from './constants'

const resSchema = z.object({
  brands: z.array(
    z.object({
      upcmgcity: z.array(z.string()).optional(),
      city: z.array(z.string()).optional(),
      state: z.string(),
    }),
  ),
})

type Check5gStatesResponse = {
  status: 'success' | 'error'
  msg: string
}

export async function checkIsUpdated5gStates(env: Env): Promise<Check5gStatesResponse> {
  try {
    const res = await fetchWithTimeout(env.VI_FIVEG_STATE_LIST_API, FETCH_TIMEOUT_MS)
    if (!res.ok) {
      return { status: 'error', msg: `❌ Failed to fetch 5G state data. (${res.status})` }
    }

    const data = await res.json()
    const parsedData = resSchema.safeParse(data)

    if (!parsedData.success) {
      return { status: 'error', msg: `❌ Failed to parse 5G state data.` }
    }

    const states = parsedData.data.brands.filter(brand => !brand.upcmgcity).map(brand => brand.state)

    if (states.length > MINIMUM_NEW_STATE_COUNT) {
      return {
        status: 'success',
        msg: `📡 *New 5G enabled states found:* ${states.join(', ')}`,
      }
    }

    return { status: 'success', msg: '📡 No new 5G states found.' }
  } catch {
    return { status: 'error', msg: '❌ Unexpected error occurred while checking 5G states.' }
  }
}
