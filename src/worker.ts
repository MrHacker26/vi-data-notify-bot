import { sendTelegramMessage } from './lib/bot'
import { checkIsUpdated5gStates } from './lib/check-5g-states'
import { hasUnlimitedDataPlan } from './lib/checker'
import { parseEnv } from './lib/env'
import { fetchPressReleases } from './lib/press-release'

export type Env = {
  TELEGRAM_BOT_TOKEN: string
  USER_CHAT_ID: string
  VI_API_URL: string
  VI_FIVEG_STATE_LIST_API: string
  VI_PRESS_RELEASE_API: string
}

export default {
  async scheduled(_: ScheduledEvent, envVars: Env) {
    const env = parseEnv(envVars)
    const { planDetails } = await hasUnlimitedDataPlan(env)

    const { msg: stateMsg } = await checkIsUpdated5gStates(env)
    const { msg: pressReleaseMsg } = await fetchPressReleases(env)
    const fullMessage = `${planDetails}\n\n${stateMsg}\n\n${pressReleaseMsg}`

    await sendTelegramMessage(fullMessage, env)
  },
}
