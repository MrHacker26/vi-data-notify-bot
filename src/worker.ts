import { sendTelegramMessage } from './lib/bot'
import { checkIsUpdated5gStates } from './lib/check-5g-states'
import { hasUnlimitedDataPlan } from './lib/checker'
import { parseEnv } from './lib/env'

export type Env = {
  TELEGRAM_BOT_TOKEN: string
  USER_CHAT_ID: string
  VI_API_URL: string
  VI_FIVEG_STATE_LIST_API: string
}

export default {
  async scheduled(_: ScheduledEvent, envVars: Env) {
    const env = parseEnv(envVars)
    const hasPlan = await hasUnlimitedDataPlan(env)

    const planMsg = hasPlan
      ? '🚨 *Unlimited Data Plan is now available!*'
      : '⚠️ No unlimited plan available yet. Please check back later.'

    const { msg: stateMsg } = await checkIsUpdated5gStates(env)
    const fullMessage = `${planMsg}\n\n${stateMsg}`

    await sendTelegramMessage(fullMessage, env)
  },
}
