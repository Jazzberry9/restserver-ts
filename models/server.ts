import express, {Application} from 'express';
import userRouter from '../routes/usuario';
import personalRouter from '../routes/personal';
import cors from 'cors';

import db from '../db/connection';


export default class Server{

    private app: Application ;
    private port: string ;
    private routerPaths = {
        usuarios: '/tfx/users',
        personal: '/tfx/personal'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        // en este orden, sino middlewares no funca
        this.dbConnection();
        this.middlewares();
        // rutas
        this.routes();
    }
    // conectar bases de datos
    async dbConnection(){
        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error( String( error ) );
        }
    }


    // en orden
    middlewares(){
        // cors
        this.app.use( cors() );

        // pareso del body
        this.app.use( express.json() );
        
        // carpeta publica, lo inicial pues...
        this.app.use( express.static('public'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en puerto:' + this.port);
        })
    }

    routes(){
        this.app.use( this.routerPaths.usuarios, userRouter)
        this.app.use( this.routerPaths.personal, personalRouter)
    }
}