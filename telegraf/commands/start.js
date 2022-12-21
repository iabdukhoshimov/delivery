const UserStorage = require('../../storage/mongo/user')


const startCommand = async (ctx) => {
    const chat_id = ctx.message.chat.id
   
    const is_exist = await UserStorage.IsRegister({ chat_id })
    if(!is_exist) {
        const new_user = await UserStorage.Register({ chat_id })
      
        await ctx.scene.enter('phone')
    } else {
        await ctx.scene.enter('home')
        return
    }
}

module.exports = startCommand