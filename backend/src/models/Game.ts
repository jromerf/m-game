import mongoose, { Schema,Document } from "mongoose";

interface IGame extends Document {
    roomId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    winner: boolean;
}

const gameSchema = new Schema<IGame>({
    roomId: { type: Schema.Types.ObjectId, required: true, ref: "Room" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    winner: { type: Boolean, default: false }
});

export default mongoose.model<IGame>("Game", gameSchema);
