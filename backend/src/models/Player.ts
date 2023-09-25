import mongoose, { Schema } from "mongoose";

interface IPlayer extends Document{
    score: number;
    user: mongoose.Types.ObjectId
}

const playerSchema = new Schema<IPlayer>({
    score: {type:Number, default: 0},
    user: {type: Schema.Types.ObjectId, required:true, ref:"User"}
});

export default mongoose.model<IPlayer>('Player',playerSchema);
