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
// VENCIMIENTO DE TOKEN
//====================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//====================================
// SEED de autenticacion
//====================================
process.env.SEED = process.env.SEED || 'seed de desarrollo';

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

//====================================
// GOOGLE CLIENT ID
//====================================

process.env.CLIENT_ID === process.env.CLIENT_ID || '79917421222-figovlniana6angvahls9d9v77s95tu3.apps.googleusercontent.com';