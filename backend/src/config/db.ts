import mongoose from "mongoose";

const dbURI = 'mongodb://localhost:27017/music-game-db';

(async ()=>{

    await mongoose.connect(dbURI);
    console.log('Connected to database');
})();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión a MongoDB establecida.');

});

//Desconectamos de la bbdd cuando cerramos el programa
process.on('SIGINT', () => {
    mongoose.connection.close().then(() => {
        console.log('Conexión a MongoDB cerrada por terminación de la aplicación');
        process.exit(0);
    });
});


export default mongoose;
