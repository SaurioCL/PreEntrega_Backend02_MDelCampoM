import { Schema, model } from "mongoose";
// import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email:  { type: String, required: true, unique: true },  
  age: { type: Number, require: true },
  password: { type: String, required: true },
  // cart: { type: Schema.Types.ObjectId, ref: "cart" },
  role: { type: String, enum: ["admin", "user"], default: 'user'}
});

export const userModel = model('users', userSchema); 

// userSchema.plugin(mongoosePaginate);

// UserSchema.pre('find', function(){
//   this.populate('products')
// })