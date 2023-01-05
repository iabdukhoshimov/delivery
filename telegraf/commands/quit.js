const UserStorage = require('../../storage/mongo/user')

const quitCommand = async(ctx) => {
    const chat_id = ctx.message.chat.id

    const resp = await UserStorage.Quit({ chat_id })
    if (resp) {
        await ctx.reply('Вы успешно вышли из системы')
        await ctx.scene.enter('phone')
        return
    }
    await ctx.reply('Ошибка при выходе из системы')
    await ctx.scene.enter('home')
    return
}

module.exports = quitCommand