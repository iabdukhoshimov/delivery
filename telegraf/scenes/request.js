const Telegraf = require('telegraf')
const { Extra, Markup } = Telegraf
const Scene = require('telegraf/scenes/base')
const UserStorage = require('../../storage/mongo/user')
const request_keyboards = require('../keyboards/request')
const { request_message } = require('../../helper/constants')
const request = require('../keyboards/request')

class RequestApplication {
    RequestApplication() {
        const request_application = new Scene('request_application');

        request_application.enter(async(ctx) => {
            const chat_id = ctx.message ? ctx.message.chat.id : ctx.chat.id

            const user = await UserStorage.FindUser({ chat_id })
            if (!user) {
                await ctx.scene.enter('phone')
            }

            await ctx.reply(
                request_message[user.choosen_lang],
                Markup
                .keyboard(request_keyboards[user.choosen_lang])
                .oneTime()
                .resize()
                .extra()
            )
            return
        })

        // if user changes the language
        request_application.action(/change_lang/, async ctx => {
            const chat_id = ctx.update.callback_query.message.chat.id
            const user = await UserStorage.FindUser({ chat_id })
            if (!user) {
                await ctx.scene.enter('phone')
            }

            const lang = request_keyboards[user.choosen_lang]
            await ctx.editMessageText(
                request_message[user.choosen_lang],
                Extra.HTML().markup((m) =>
                    m.inlineKeyboard([
                        m.callbackButton(lang[0][0]['text'], 'uz'),
                        m.callbackButton(lang[0][1]['text'], 'ru'),
                        m.callbackButton(lang[0][2]['text'], 'en'),
                    ])
                )
            )
        })


        request_application.on('text', async ctx => {
            const chat_id = ctx.message.chat.id
            const msg = ctx.message.text

            const user = await UserStorage.FindUser({ chat_id })
            if (!user) {
                await ctx.scene.enter('phone')
            }

            const lang = request_keyboards[user.choosen_lang]

            if (msg == lang[4][0]['text']) { // go to HomeScene
                await ctx.scene.enter('home')
                return
            }
        });
        return request_application
    }
}

module.exports = RequestApplication