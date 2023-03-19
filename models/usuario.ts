// Para crear modelo de usuarios
import { DataTypes } from 'sequelize';
// obtener la base de datos para definir el modelo
import db from '../db/connection';

// definir registro que se va a trabajar en base de datos
const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
});

export default Usuario;



