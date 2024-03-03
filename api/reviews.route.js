import express from "express"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

// Route to get all reviews for a specific movie
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)

// Route to add a new review
router.route("/new").post(ReviewsCtrl.apiPostReview)

// Route to get, update, and delete a specific review by ID
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview) // Get review by ID
    .put(ReviewsCtrl.apiUpdateReview) // Update review by ID
    .delete(ReviewsCtrl.apiDeleteReview) // Delete review by ID

export default router
