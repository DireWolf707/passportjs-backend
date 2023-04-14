import mongoose from "mongoose"

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minLength: [2, "Username should be of min length 2"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [2, "Name should be of min length 2"],
  },
  avatar: {
    type: String,
  },
})

const model = mongoose.model("user", schema)

export default model
