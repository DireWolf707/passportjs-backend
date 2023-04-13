import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import fileupload from "express-fileupload"

import AppError from "./utils/appError.js"
import globalErrorHandler from "./controllers/errorController.js"

// Express app Init
const app = express()

// Enable when runing behind a reverse proxy
// app.enable("trust proxy")

// GLOBAL MIDDLEWARES
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN_URL,
  })
) // TODO
app.options("*", cors()) // enable CORS Pre-Flight

// Enable when serving static files
// app.use(express.static(path.join(__dirname, "public")))

app.use(helmet()) // Set security HTTP headers

// logging
if (process.env.NODE_ENV === "production") app.use(morgan("short"))
else app.use(morgan("dev"))

// Body parser
app.use(express.json({ limit: "10kb" })) // for json data
// app.use(express.urlencoded({ extended: true, limit: "10kb" })) // for html form data

// File upload
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

// Custom middlewares
// app.use((req, res, next) => {next()})

// ROUTES
app.get("/", (req, res, next) => {
  res.json("DireWolf!")
})

// 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Error Handler
app.use(globalErrorHandler)

export default app
