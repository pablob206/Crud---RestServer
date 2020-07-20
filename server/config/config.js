///VARIABLES DE ENTORNO
//====================================
// PUERTO
//====================================
process.env.PORT = process.env.PORT || 3000;

//====================================
// PUERTO ENTORNO
//====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================
// BASE DE DATOS
//====================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe1';
} else {
    urlDB = process.env.MONGO_URI;

}
process.env.URLDB = urlDB;