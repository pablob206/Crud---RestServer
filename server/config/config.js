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
    urlDB = 'mongodb+srv://pablob206:Land*1945@cluster0.fugtn.mongodb.net/cafe1';
}
process.env.URLDB = urlDB;