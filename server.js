import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express()

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors())

// Parse JSON bodies
app.use(express.json())

// Route for handling reviews API requests
app.use("/api/v1/reviews", reviews)

// Error handling for unspecified routes
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app
