import { sendTelegramMessage } from './lib/bot'
import { hasUnlimitedDataPlan } from './lib/checker'
import { parseEnv } from './lib/env'

export type Env = {
  TELEGRAM_BOT_TOKEN: string
  USER_CHAT_ID: string
  VI_API_URL: string
}

export default {
  async scheduled(_: ScheduledEvent, envVars: Env) {
    const env = parseEnv(envVars)
    const hasPlan = await hasUnlimitedDataPlan(env)

    if (hasPlan) {
      await sendTelegramMessage(`🚨 *Unlimited Data Plan is now available!*`, env)
    } else {
      console.log('No unlimited plan available yet.')
      await sendTelegramMessage(`No unlimited plan available yet. Please check back later.`, env)
    }
  },
}
