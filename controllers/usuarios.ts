import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async ( req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        msg: 'getUsuarios',
        usuarios
    })
}
export const getUsuario = async( req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if ( usuario === null ){
        res.status(404).send({
            msg: 'User not found'
        })
    }

    res.json({
        usuario
    })
}

export const postUsuario = async( req: Request, res: Response) => {

    const { body } = req;

    try {
        const emailExist = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
    
        if ( emailExist ) {
            return res.status(500).json({
                msg: `el email ${body.email} ya existe`
            })
        }

        const usuario = Usuario.build(body);
        await usuario.save();

        res.status(200).send({
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'talk with the admin'
        }
        )
    }

}
export const putUsuario = async( req: Request, res: Response) => {

    const { body } = req;
    const { id } = req.params;

    try {
        
        const usuario = await Usuario.findByPk(id)

        if(!usuario){
            return res.status(404).json({
                msg: `The user id ${id} was not found`
            })
        }

        await usuario.update( body );

        res.status(200).send({
            usuario
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'talk with the admin'
            }
        )
    }
}
export const deleteUsuario = async( req: Request, res: Response) => {

    const { id } = req.params;
        
    const usuario = await Usuario.findByPk(id)
    if(!usuario){
        return res.status(404).json({
            msg: `The user id ${id} was not found`
        })
    }

    // destruccion logica, recomendad
    await usuario.update({ estado: false})

    // destruccion fisica, no recomendada
    // await usuario.destroy();

    res.status(200).send({
        msg: 'user deleted',
        usuario
    })
}

