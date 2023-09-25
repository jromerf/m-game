import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    userID:string;
    username: string;
    // email: string;
}

const userSchema = new Schema<IUser>({
    userID: { type: String, required: true },
    username: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // Definir otros campos y opciones de esquema
});

export default mongoose.model<IUser>("User", userSchema);
