const mongoose = require("mongoose")
const { v4 } = require("uuid")

const User = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    chat_id: {
        type: String,
        required: [true, 'chat_id is required']
    },
    full_name: {
        type: String,
        required: [true, 'full_name is required']
    },
    merchant_id: {
        type: String,
        required: [true, 'merchant_id is required']
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_available: {
        type: Boolean,
        default: true
    },
    ordersOverAll: {
        type: Number,
        default: 0
    },
    ordersSummOverAll: {
        type: Number,
        default: 0
    },
    income_waiting: {
        type: Number,
        default: 0
    },
    income_overall: {
        type: Number,
        default: 0
    },
    choosen_lang: {
        type: String,
        enum: ['en', 'ru', 'uz']
    },
    phone: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        hireAt: "hire_at"
    }
})


module.exports = {
    UserModel: mongoose.model('User', User)
}