import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  
  // Method to add a new review
  static async apiPostReview(req, res, next) {
    try {
      // Extract necessary data from request body
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user
      
      // Add review using ReviewsDAO
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      
      // Send success response
      res.json({ status: "success" })
    } catch (e) {
      // Handle errors
      res.status(500).json({ error: e.message })
    }
  }

  // Method to get a review by ID
  static async apiGetReview(req, res, next) {
    try {
      // Extract review ID from request parameters
      let id = req.params.id || {}
      
      // Retrieve review using ReviewsDAO
      let review = await ReviewsDAO.getReview(id)
      
      // Check if review exists
      if (!review) {
        res.status(404).json({ error: "Not found" })
        return
      }
      
      // Send review as JSON response
      res.json(review)
    } catch (e) {
      // Handle errors
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  // Method to update an existing review
  static async apiUpdateReview(req, res, next) {
    try {
      // Extract review ID, review, and user data from request
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user
      
      // Update review using ReviewsDAO
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )
      
      // Check for errors
      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }
      
      // Check if review was updated successfully
      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review")
      }
      
      // Send success response
      res.json({ status: "success" })
    } catch (e) {
      // Handle errors
      res.status(500).json({ error: e.message })
    }
  }

  // Method to delete a review
  static async apiDeleteReview(req, res, next) {
    try {
      // Extract review ID from request parameters
      const reviewId = req.params.id
      
      // Delete review using ReviewsDAO
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      
      // Send success response
      res.json({ status: "success" })
    } catch (e) {
      // Handle errors
      res.status(500).json({ error: e.message })
    }
  }

  // Method to get all reviews for a specific movie
  static async apiGetReviews(req, res, next) {
    try {
      // Extract movie ID from request parameters
      let id = req.params.id || {}
      
      // Retrieve reviews for the movie using ReviewsDAO
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
      
      // Check if reviews exist
      if (!reviews) {
        res.status(404).json({ error: "Not found" })
        return
      }
      
      // Send reviews as JSON response
      res.json(reviews)
    } catch (e) {
      // Handle errors
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}
