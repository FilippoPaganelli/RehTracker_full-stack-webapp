const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const therapyPhaseSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    exerciseTypes: {
      type: [Number],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TherapyPhase = mongoose.model('TherapyPhase', therapyPhaseSchema);

module.exports = TherapyPhase;
