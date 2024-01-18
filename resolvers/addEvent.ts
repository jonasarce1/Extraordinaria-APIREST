import {Request, Response} from "express";
import mongoose from "mongoose";
import { EventoModelType, EventoModel } from "../db/EventoDB.ts";

export const addEvent = async(req: Request<string, string | undefined, Date, number, number, Object[]>, res: Response<EventoModelType | null>) => {
    try{
        const {titulo, descripcion, fecha, inicio, fin, invitados} = req.body;

        const evento = new EventoModel({
            titulo,
            descripcion,
            fecha,
            inicio,
            fin,
            invitados
        })

        await evento.save();

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