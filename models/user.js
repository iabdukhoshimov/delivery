const mongoose = require("mongoose")
const { v4 } = require("uuid")

const User = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: v4
        },
        chat_id: {
            type: String,
            required: [true, 'chat_id is required']
        },
        choosen_lang: {
            type: String,
            enum: ['en', 'ru', 'uz']
        },
        phone: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
)


module.exports = {
    UserModel: mongoose.model('User', User)
}