const Telegraf = require('telegraf')
const { Extra, Markup } = Telegraf
const Scene = require('telegraf/scenes/base')
const UserStorage = require('../../storage/mongo/user')
const config = require('../../config/index')
const home_keyboards = require('../keyboards/home')
const { home_message } = require('../../helper/constants')

class HomeScene {
    Home () {
        const home = new Scene('home');
        
        home.enter(async (ctx) => { 
            const chat_id = ctx.message ? ctx.message.chat.id : ctx.chat.id

            const user = await UserStorage.FindUser({ chat_id })
            if(!user) {
                await ctx.scene.enter('phone')
            }

            await ctx.reply(
                home_message[user.choosen_lang], 
                Markup
                    .keyboard(home_keyboards[user.choosen_lang])
                    .oneTime()
                    .resize()
                    .extra()
            )
        })
        home.on('text', async ctx => {
            const chat_id = ctx.message.chat.id
            const msg = ctx.message.text

            const user = await UserStorage.FindUser({ chat_id })
            if(!user) {
                await ctx.scene.enter('phone')
            }

            const lang = home_keyboards[user.choosen_lang]

            if(msg == lang[0][0]['text']) {
                await ctx.scene.enter('request_application')
                return
            } else if (msg == lang[7][0]) { // go to LanguageScene
                await ctx.scene.enter('lang')
                return
            }

        })
        return home
    }
}

module.exports = HomeScene