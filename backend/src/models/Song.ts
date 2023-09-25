import mongoose, { Schema, Document } from "mongoose";

// Definir una interfaz para el modelo Song
interface ISong extends Document {
    artist: string;
    title: string;
    year: number;
    category: string;
}

// Crear el esquema del modelo Song
const songSchema = new Schema<ISong>({
    artist: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
});

// Exportar el modelo Song
export default mongoose.model<ISong>("Song", songSchema);
