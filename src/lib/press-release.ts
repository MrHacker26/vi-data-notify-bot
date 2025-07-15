import type { Env } from 'src/worker'
import { z } from 'zod'

const pressReleaseSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      newsType: z.string(),
      newsTitle: z.string(),
    }),
  ),
})

export type PressReleaseResponse = {
  status: 'success' | 'error'
  msg: string
}

export async function fetchPressReleases(env: Env): Promise<PressReleaseResponse> {
  try {
    const res = await fetch(env.VI_PRESS_RELEASE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'search={"q":"*","newsType":"press","newsCategory":"*","newsCircle":"UP(W)","newsYear":"2025","pageNumber":1}',
    })

    if (!res.ok) {
      return { status: 'error', msg: `❌ Failed to fetch press releases. (${res.status})` }
    }

    const responseText = await res.text()

    let data

    if (responseText === 'Error') {
      return { status: 'error', msg: '📰 No press releases found.' }
    } else {
      try {
        data = JSON.parse(responseText)
      } catch {
        data = 'Error'
      }
    }

    const parsedData = pressReleaseSchema.safeParse(data)

    if (!parsedData.success) {
      return { status: 'error', msg: 'Failed to parse press release data.' }
    }

    const filteredData = parsedData.data.results.map(pr => pr.newsTitle).join('\n')

    return {
      status: 'success',
      msg: `📢 *Latest Press Releases:*${filteredData}`,
    }
  } catch {
    return { status: 'error', msg: 'Unexpected error occurred while fetching press releases' }
  }
}
