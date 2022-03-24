const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    
}, {
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;