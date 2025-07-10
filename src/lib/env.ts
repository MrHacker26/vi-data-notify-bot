import type { Env } from 'src/worker'
import { z } from 'zod'

const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'Telegram bot token is required'),
  USER_CHAT_ID: z.string().min(1, 'User chat ID is required'),
  VI_API_URL: z.string().url('Valid Vi API URL is required'),
  VI_FIVEG_STATE_LIST_API: z.string().url('Valid Vi 5G state list API URL is required'),
})

export function parseEnv(rawEnv: Env) {
  const parsed = envSchema.safeParse(rawEnv)
  if (!parsed.success) {
    throw new Error(`Environment variable validation failed: ${JSON.stringify(parsed.error.format(), null, 2)}`)
  }
  return parsed.data
}
