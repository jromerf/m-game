
import mongoose from 'mongoose';

const dbURI = 'mongodb://localhost:27017/music-game-db';

export function connectToMongoDB(): void {
    mongoose.connect(dbURI).then(() => {
        console.log('Connected to database');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}
