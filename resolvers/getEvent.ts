import {Request, Response} from "express";
import mongoose from "mongoose";
import { EventoModelType, EventoModel } from "../db/EventoDB.ts";

export const getEvent = async(req:Request<string>, res:Response<EventoModelType | null>) => {
    try{
        const id = req.params.id;

        const evento = await EventoModel.findById(id).exec();

        if(!evento){
            res.status(404).send("No se encontro un evento con ese id");
            return;
        }

        res.status(200).send(evento);
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