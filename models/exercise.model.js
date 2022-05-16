const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: new Date(),
    },
    type: {
      type: Number,
      required: true,
    },
    currentSet: {
      type: Number,
      required: true,
      default: 1,
    },
    repetitionInSet: {
      type: Number,
      required: true,
      default: 0,
    },
    therapyId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
