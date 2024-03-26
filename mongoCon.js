const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://localhost:27017/education";

async function connectMongoDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the MongoDB database object
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = { connectMongoDB, ObjectId };
