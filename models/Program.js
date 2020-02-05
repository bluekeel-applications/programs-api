const mongoose = require('mongoose');

const VarObj = new mongoose.Schema({
    vertical: String,
    loan_type: String,
    debt_type: String,
    debt_amount: String,
    checking_optin: Boolean,
    debt_optin: Boolean,
    email_optin: Boolean
}, {
    _id: false,
    autoIndex: false
});

const ProgramSchema = new mongoose.Schema({
    domain: String,
    pid: [{
        type: Number,
        default: 0,
        required: true
    }],
    vars: VarObj,
    endpoints: [{
        name: String,
        url: String,
        jump: String,
        usage: Number,
        offer_page: String,
        four_button: [String],
        restricted: {
            type: Boolean,
            default: false
        },
        states: [String]
    }],
    click_count: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    modified: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.model('Program', ProgramSchema);