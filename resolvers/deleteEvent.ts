import {Request, Response} from "express";
import mongoose from "mongoose";
import { EventoModel } from "../db/EventoDB.ts";

export const deleteEvent = async(req: Request<string>, res: Response<string>) => {
    try{
        const id = req.params.id;

        const eventoBorrado = await EventoModel.findByIdAndDelete(id).exec();

        if(!eventoBorrado){
            res.status(404).send("No se encontro un evento con ese id");
            return;
        }

        res.status(200).send("El evento fue borrado correctamente");
    }catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            const validationErrors = Object.keys(error.errors).map(
                (key) => error.errors[key].message
            );
            res.status(400).send("Error de validacion: " + validationErrors.join(", "));
        }else{
            res.status(400).send(error.message);
        }
    }
}