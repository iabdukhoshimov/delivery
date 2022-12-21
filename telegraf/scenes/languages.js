const Telegraf = require('telegraf')
const { Extra, Markup } = Telegraf
const Scene = require('telegraf/scenes/base')
const UserStorage = require('../../storage/mongo/user')
const l_keyboards = require('../keyboards/languages')

class LangScene {
    Language () {
        const lang = new Scene('lang');
        
        lang.enter(async (ctx) => {
            await ctx.reply(
                'Выберите язык', 
                Markup
                    .keyboard(l_keyboards.lang_keyboard)
                    .oneTime()
                    .resize()
                    .extra()
            )
            return
        })
        lang.on('text', async ctx => {
            const chat_id = ctx.message.chat.id
            const msg = ctx.message.text

            if(
                l_keyboards.lang_keyboard[0][0] != msg &&
                l_keyboards.lang_keyboard[1][0] != msg &&
                l_keyboards.lang_keyboard[2][0] != msg 
            ) {
                await ctx.scene.reenter()
                return
            }
           
            let arg = { chat_id: chat_id }
            if(msg == l_keyboards.lang_keyboard[0][0]) {
                arg.lang = l_keyboards.ru
            } else if (msg == l_keyboards.lang_keyboard[1][0]) {
                arg.lang = l_keyboards.en
            } else if (msg == l_keyboards.lang_keyboard[2][0]) {
                arg.lang = l_keyboards.uz
            }
            const resp = await UserStorage.ChangeLanguage(arg)
            
            await ctx.scene.enter('home')
            return
        })
        return lang
    }
}

module.exports = LangScene