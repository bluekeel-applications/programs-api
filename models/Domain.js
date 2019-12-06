const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
    title: String,
    pid: Number,
    domain: String,
    description: String,
    avatar: String,
    accepts: [{
        title: String,
        avatar: [String],
        value: String
    }],
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

export default mongoose.model('Domain', DomainSchema);