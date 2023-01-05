// DEPENDENCIES
require('dotenv').config()
require('./config/connection')
const config = require("./config/index")

// TELEGRAF
const Telegraf = require('telegraf')
const bot = new Telegraf(config.telegramToken)
const { Stage, session } = Telegraf

// Scenes
const HomeScene = require('./telegraf/scenes/home')
const LanguageScene = require('./telegraf/scenes/languages')
const PhoneScene = require('./telegraf/scenes/phone')
const RequestScene = require('./telegraf/scenes/request')


// Actions


// Commands
const startCommand = require('./telegraf/commands/start')
const restartCommand = require('./telegraf/commands/restart')
const quitCommand = require('./telegraf/commands/quit')
const statusCommand = require('./telegraf/commands/status')



const homeScene = new HomeScene()
const langScene = new LanguageScene()
const phoneScene = new PhoneScene()
const requestScene = new RequestScene()

const stages = new Stage([
    homeScene.Home(),
    langScene.Language(),
    phoneScene.Phone(),
    requestScene.RequestApplication(),
])

// bot.telegram.setMyCommands()
bot.use(session())
bot.use(stages.middleware())
bot.command('start', startCommand)
bot.command('restart', restartCommand)
bot.command('quit', quitCommand)
bot.command('status', statusCommand)

bot.launch()
    .then(() => console.log("Telegram bot working globally...🌐"))
    .catch((err) => console.log(err.message))