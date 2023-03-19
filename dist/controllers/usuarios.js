"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        msg: 'getUsuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario === null) {
        res.status(404).send({
            msg: 'User not found'
        });
    }
    res.json({
        usuario
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExist = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExist) {
            return res.status(500).json({
                msg: `el email ${body.email} ya existe`
            });
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        res.status(200).send({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'talk with the admin'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `The user id ${id} was not found`
            });
        }
        yield usuario.update(body);
        res.status(200).send({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'talk with the admin'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `The user id ${id} was not found`
        });
    }
    // destruccion logica, recomendad
    yield usuario.update({ estado: false });
    // destruccion fisica, no recomendada
    // await usuario.destroy();
    res.status(200).send({
        msg: 'user deleted',
        usuario
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map