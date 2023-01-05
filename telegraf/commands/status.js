const UserStorage = require('../../storage/mongo/user')

const statusCommand = async(ctx) => {
    const chat_id = ctx.message.chat.id

    const resp = await UserStorage.GetStatus({ chat_id })
    if (resp) {
        await ctx.reply(resp)
        return
    }
    await ctx.reply('Ошибка при получении статуса')
    return
}

module.exports = statusCommand