import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getPersonal = async ( req: Request, res: Response) => {

    const personal = await Usuario.findAll();

    res.json({
        msg: 'get Personal',
        personal
    })
}