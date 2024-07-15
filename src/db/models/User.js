import { Schema, model } from 'mongoose';
import { emailRegExp } from '../../constants/user-constants.js';
import { mongooseSaveError, setUpdateSet } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

//метод з видаленням паролю зі схеми
// User.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password,
//   return obj
// };

userSchema.post('save', mongooseSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSet);
userSchema.post('findOneAndUpdate', mongooseSaveError);

const User = model('user', userSchema);
export default User;
