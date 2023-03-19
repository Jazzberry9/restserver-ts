"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Para crear modelo de usuarios
const sequelize_1 = require("sequelize");
// obtener la base de datos para definir el modelo
const connection_1 = __importDefault(require("../db/connection"));
// definir registro que se va a trabajar en base de datos
const Usuario = connection_1.default.define('Usuario', {
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map