const { UserModel } = require('../../models/user')

const UserStorage = {       
    Register: async (arg) => {
        const user = await UserModel.create(
            {
                chat_id: arg.chat_id
            }
        )
        if(!user) {
            return false
        }
        return true
    },
    IsRegister: async (arg) => {
        const user = await UserModel.findOne({chat_id: arg.chat_id})
        return user
    },
    ChangeLanguage: async (arg) => {
        const user = await UserModel.findOneAndUpdate(
            {
                chat_id: arg.chat_id
            },
            {
                $set: {
                    choosen_lang: arg.lang
                }
            },
            {
                new: true
            }
        )

        return user
    },
    ChangePhone: async (arg) => {
        const user = await UserModel.findOneAndUpdate(
            {
                chat_id: arg.chat_id
            },
            {
                $set: {
                    phone: arg.phone
                }
            },
            {
                new: true
            }
        )

        return user
    },
    FindUser: async (arg) => {
        const user = await UserModel.findOne({chat_id: arg.chat_id})

        return user
    }
}

module.exports = UserStorage