const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const patientSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre('save', function (next) {
  const patient = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(patient.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          patient.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

patientSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
