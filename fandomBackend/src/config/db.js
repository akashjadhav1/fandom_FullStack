const mongoose = require('mongoose');


const db = async () => {
    // Retrieve MongoDB URI from environment variables
    const mongo_url = process.env.MONGO_URI;
    try {
        // Attempt to connect to the MongoDB database
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,   
            useUnifiedTopology: true  
        });
        // Log a success message if the connection is successful
        console.log("Connected to MongoDB database");
    } catch (error) {
        // Log an error message if the connection fails
        console.log("Error connecting to MongoDB database", error);
    }
};


module.exports = db;
