import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../../models/index.js"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL}${process.env.GOOGLE_CALLBACK}`,
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { email, picture: avatar, given_name: username } = profile._json
      try {
        // insert only if new
        const user = await User.findOneAndUpdate({ email }, { email, avatar, username }, { upsert: true })
        cb(null, user)
      } catch (err) {
        cb(err, null)
      }
    }
  )
)

passport.serializeUser(({ _id, email, username, avatar }, done) => done(null, { _id, email, username, avatar }))

passport.deserializeUser((user, done) => done(null, user))
