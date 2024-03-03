import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;

// Define your MongoDB username and password
const MONGO_USERNAME = "Amanrt";
const MONGO_PASSWORD = "uToOvlY19y1yfnK4";

// Retrieve MongoDB connection details from environment variables
const mongo_username = process.env.MONGO_USERNAME || MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD || MONGO_PASSWORD;

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.6gtliqg.mongodb.net`;

const port = 8000;

// Connect to MongoDB
MongoClient.connect(uri, {
    maxPoolSize: 50, // Set maximum pool size for connections
    wtimeoutMS: 2500, // Set the write timeout
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true // Use new Server Discover and Monitoring engine
})
.catch(err => {
    // Log and exit if connection fails
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    // Inject database connection into ReviewsDAO
    await ReviewsDAO.injectDB(client);
    
    // Start the server
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
