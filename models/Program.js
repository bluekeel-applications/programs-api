const mongoose = require('mongoose');

const VarObj = new mongoose.Schema({
    media_type: String,
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
    vars: VarObj,
    endpoints: [{
        url: String,
        usage: Number
    }],
    clickCount: {
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