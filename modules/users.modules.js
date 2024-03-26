const { ObjectId } = require('./mongo');

async function getUsers(db) {
    try {
        const users = await db.collection('users').find().toArray();
        console.log(users);
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function getUserById(db, userId) {
    try {
        const user = await db.collection('users').findOne({_id: new ObjectId(userId) });
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

async function createUser(db, userData) {
    try {
        const result = await db.collection('users').insertOne(userData);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function updateUser(db, userId, updatedUserData) {
    try {
        const result = await db.collection('users').updateOne(
            { _id: ObjectId(userId) },
            { $set: updatedUserData }
        );
        return result.modifiedCount;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUser(db, userId) {
    try {
        const result = await db.collection('users').deleteOne({ _id: ObjectId(userId) });
        return result.deletedCount;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };