import type { Env } from 'src/worker'

export async function sendTelegramMessage(message: string, env: Env) {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`
  const payload = {
    chat_id: env.USER_CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    console.error('Telegram error:', await res.text())
  }
}
