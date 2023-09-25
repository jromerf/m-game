import mongoose, { Schema ,Document, mongo} from "mongoose";

interface IRoom extends Document {
    roomID: string;
    host: mongoose.Types.ObjectId;
    players: Map<mongoose.Types.ObjectId,string>;
    winner: string | null;
}

const roomSchema = new Schema<IRoom>({
    roomID: { type: String, required: true, unique: true },
    host: { type: Schema.Types.ObjectId, required: true, unique: true , ref:"User"},
    players: { type: Map },
    winner: { type: String, default: null }
});

export default mongoose.model<IRoom>('Room',roomSchema);
