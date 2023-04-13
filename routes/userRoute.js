import express from "express"
import passport from "passport"
// import { updatePassword, updateProfile, updateAvatar, deleteAvatar } from "../controllers/userController.js"

const router = express.Router()
router.get("/login/google", passport.authenticate("google"))
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { successRedirect: "/user/oauth2/success", failureRedirect: "/user/oauth2/failure" })
)
router.get("/oauth2/success", (req, res) => res.status(200).json({ message: "success" }))
router.get("/oauth2/failure", (req, res) => res.status(400).json({ message: "error" }))

router.post("/logout", (req, res) => {
  req.logOut()
  res.redirect("/")
})

// router.post("/profile", validateToken, updateProfile).post("/password", validateToken, updatePassword)
// router.route("/avatar").post(validateToken, updateAvatar).delete(validateToken, deleteAvatar)

export default router
