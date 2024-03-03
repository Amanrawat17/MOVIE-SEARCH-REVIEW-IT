import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

// Define a variable to store the reviews collection
let reviews

export default class ReviewsDAO {
  
  // Method to inject database connection
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      // Establish connection to the "reviews" collection in the database
      reviews = await conn.db("reviews").collection("reviews")
    } catch (e) {
      // Log error if connection cannot be established
      console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`)
    }
  }

  // Method to add a new review
  static async addReview(movieId, user, review) {
    try {
      // Create a document representing the review
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      }
      
      // Insert the review document into the collection
      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      // Log error if adding review fails
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  // Method to get a review by its ID
  static async getReview(reviewId) {
    try {
      // Find and return the review document with the provided ID
      return await reviews.findOne({ _id: ObjectId(reviewId) })
    } catch (e) {
      // Log error if retrieving review fails
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  // Method to update an existing review
  static async updateReview(reviewId, user, review) {
    try {
      // Update the review document with the provided ID
      const updateResponse = await reviews.updateOne(
        { _id: ObjectId(reviewId) },
        { $set: { user: user, review: review } }
      )

      return updateResponse
    } catch (e) {
      // Log error if updating review fails
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  // Method to delete a review by its ID
  static async deleteReview(reviewId) {
    try {
      // Delete the review document with the provided ID
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
      })

      return deleteResponse
    } catch (e) {
      // Log error if deleting review fails
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  // Method to get all reviews for a specific movie
  static async getReviewsByMovieId(movieId) {
    try {
      // Find and return all review documents for the provided movie ID
      const cursor = await reviews.find({ movieId: parseInt(movieId) })
      return cursor.toArray()
    } catch (e) {
      // Log error if retrieving reviews fails
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

}
