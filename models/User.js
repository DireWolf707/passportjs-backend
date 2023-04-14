import mongoose from "mongoose"

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
  },
  avatar: {
    type: String,
  },
})

const model = mongoose.model("user", schema)

export default model
