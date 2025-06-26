# VI Data Notify Bot 📱🔔

A Cloudflare Worker-based bot that monitors VI (Vodafone Idea) for unlimited 4G/5G data plans and sends real-time notifications via Telegram when these plans become available.

## 💡 Why This Bot?

Tired of manually checking daily whether VI has unlimited data plans available in your area? This bot solves that problem by:

- **🔍 Eliminates Manual Checking**: No more daily visits to VI's website or app
- **⚡ Early Notifications**: Get notified immediately when plans become available
- **🎯 Area-Specific Monitoring**: Tracks availability for your specific location
- **⏰ 24/7 Monitoring**: Continuous checking even when you're busy or sleeping

**Problem**: VI's unlimited plans (4G full-day, 5G unlimited) are rolled out state-wise, with only select states getting access to these plans at any given time.

**Solution**: Automated monitoring with instant Telegram alerts, so you know immediately when these plans become available in your state!

## 🚀 Features

- **Automated Monitoring**: Continuously checks VI's API for unlimited data plans
- **Smart Detection**: Identifies various types of unlimited plans:
  - Unlimited 4G data plans
  - Unlimited 5G data plans  
  - Full day unlimited data offers
- **Telegram Notifications**: Instant alerts when unlimited plans are detected
- **Scheduled Execution**: Runs automatically every 5 hours via Cloudflare Workers
- **TypeScript**: Built with type safety and modern JavaScript features

## 🛠️ Technology Stack

- **Runtime**: [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime
- **Platform**: [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless execution
- **Language**: TypeScript with Zod validation
- **Notifications**: Telegram Bot API

## 📋 Prerequisites

- [Bun](https://bun.sh) installed
- Cloudflare account
- Telegram Bot Token
- VI API endpoint access

## ⚙️ Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/MrHacker26/vi-data-notify-bot.git
cd vi-data-notify-bot
bun install
```

### 2. Environment Configuration

Set up the following environment variables in your Cloudflare Worker:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
USER_CHAT_ID=your_telegram_chat_id
VI_API_URL=vi_api_endpoint_url
```

### 3. Telegram Bot Setup

1. Create a new bot via [@BotFather](https://t.me/botfather) on Telegram
2. Get your bot token
3. Get your chat ID by messaging your bot and visiting: `https://api.telegram.org/bot<YourBOTToken>/getUpdates`

## 🚀 Development

### Local Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Type checking
bun run typecheck

# Linting
bun run lint
bun run lint:fix
```

### Deployment

```bash
# Deploy to Cloudflare Workers
bun run deploy
```

## 📁 Project Structure

```
src/
├── worker.ts          # Main Cloudflare Worker entry point
├── lib/
│   ├── bot.ts        # Telegram bot messaging logic
│   ├── checker.ts    # VI API monitoring and plan detection
│   └── env.ts        # Environment variable validation
├── index.ts          # Local development entry
├── package.json      # Dependencies and scripts
├── wrangler.toml     # Cloudflare Worker configuration
└── tsconfig.json     # TypeScript configuration
```

## 🔄 How It Works

1. **Scheduled Execution**: The worker runs every 5 hours as configured in `wrangler.toml`
2. **API Monitoring**: Fetches data from VI's API endpoint
3. **Plan Detection**: Analyzes plan data for unlimited data offerings using intelligent keyword matching
4. **Notification**: Sends Telegram message when unlimited plans are found

## 🎯 Plan Detection Logic

The bot detects unlimited plans by analyzing:
- **Plan Title**: Contains "unlimited data"
- **Description**: Mentions "unlimited 5g" or "full day unlimited data"
- **Data Line**: Includes "unlimited" keyword

## 📊 Monitoring Schedule

- **Frequency**: Every 5 hours (5 times daily)
- **Timezone**: UTC
- **Cron Pattern**: `0 */5 * * *`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This bot is for educational and personal use only. Make sure to comply with VI's terms of service and API usage policies. The authors are not responsible for any misuse of this software.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on [GitHub](https://github.com/MrHacker26/vi-data-notify-bot/issues).

---

**Built with ❤️ by [Tarun Joshi](https://github.com/MrHacker26) using Bun and Cloudflare Workers**
