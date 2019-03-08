//Configuración del puerto
process.env.PORT = process.env.PORT || 3000;





//process.env.NODE_ENV = process.env.NODE_ENV || 'mongodb://localhost/cafe';
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urldB;

if (process.env.NODE_ENV === 'dev') {
    urldB = 'mongodb://localhost/cafe';
} else {
    urldB = process.env.MONGO_URI;
}

process.env.URLDB = urldB;