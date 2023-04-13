import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { v2 as cloudinary } from "cloudinary"
import { extractCloudinaryPublicId, isCloudinaryURL } from "../utils/cloudinary.js"
import { User } from "../models/index.js"

export const updateProfile = catchAsync(async (req, res, next) => {
  ;["email"].forEach((field) => delete req.body[field])
  await User.findByIdAndUpdate(req.user._id, req.body)
  res.status(200).json({ status: "success", data: "Profile Updated Successfully!" })
})

export const updateAvatar = catchAsync(async (req, res, next) => {
  if (!req?.files?.file || !req.files.file.mimetype.startsWith("image/")) throw new AppError("ImageError: Please upload a Image file!", 400)

  const avatar = await cloudinary.uploader.upload(req.files.file.tempFilePath) // upload on cloudinary
  await User.findByIdAndUpdate(req.user._id, { avatar: avatar.secure_url }) // update user

  const prevAvatarURL = req.user.avatar
  if (isCloudinaryURL(prevAvatarURL)) cloudinary.uploader.destroy(extractCloudinaryPublicId(prevAvatarURL)) // delete on cloudinary

  res.status(200).json({ status: "success", data: "Avatar Updated Successfully!" })
})

export const deleteAvatar = catchAsync(async (req, res, next) => {
  const avatarURL = req.user.avatar
  if (isCloudinaryURL(avatarURL)) cloudinary.uploader.destroy(extractCloudinaryPublicId(avatarURL)) // delete on cloudinary
  await User.findByIdAndUpdate(req.user._id, { avatar: null })

  res.status(200).json({ status: "success", data: "Avatar Deleted Successfully!" })
})
