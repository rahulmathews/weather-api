const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    unique: true,
    lowercase : true,
    index : true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
    select: false
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
    unique: true
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  isPhoneConfirmed: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  toObject: {
    transform: true
  }
});

//compound indexes
UserSchema.index({
  firstName: 1,
  lastName: 1
}, {
  unique : true
})

//pre-query methods

module.exports = mongoose.model("User", UserSchema);
