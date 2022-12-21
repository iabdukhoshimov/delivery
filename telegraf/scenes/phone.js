const Telegraf = require('telegraf')
const { Extra, Markup } = Telegraf
const Scene = require('telegraf/scenes/base')
const UserStorage = require('../../storage/mongo/user')
const { phone_keyboard } = require('../keyboards/phone') 
const { start_message } = require('../../helper/constants') 

class PhoneScene {
    Phone () {
        const phone = new Scene('phone');
        
        phone.enter(async (ctx) => {
             await ctx.reply(
                start_message, 
                Markup
                    .keyboard(phone_keyboard)
                    .oneTime()
                    .resize()
                    .extra()
            )
            return
        })
        phone.on('text', async ctx => {
            const chat_id = ctx.message.chat.id
            const msg = ctx.message.text

            await ctx.scene.reenter()
            return
        })
        phone.on('contact', async ctx => {
            const { user_id } = ctx.update.message.contact
            const { phone_number } = ctx.update.message.contact
            
            const resp = await UserStorage.ChangePhone({ chat_id: user_id, phone: phone_number })

            if(resp) {
                await ctx.scene.enter('lang')
                return
            }
            await ctx.scene.reenter()
            return
        })
        return phone
    }
}

module.exports = PhoneScene