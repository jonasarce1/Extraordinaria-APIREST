import {Request, Response} from "express";
import mongoose from "mongoose";
import { EventoModelType, EventoModel } from "../db/EventoDB.ts";

type Invitado = {
    nombre: string;
    apellido: string;
};


//update, se le pasa id y los demas datos campos a modificar, puede ser uno o varios
export const updateEvent = async(req: Request<string, string, string, Date, number, number, Invitado[]>, res: Response<EventoModelType | null>) => {
    try{
        const {id, titulo, descripcion, fecha, inicio, fin, invitados} = req.body;

        const eventoActualizado = await EventoModel.findByIdAndUpdate(id, {
            titulo,
            descripcion,
            fecha,
            inicio,
            fin,
            invitados
        }, {runValidators: true, new: true}).exec(); 

        res.status(200).send(eventoActualizado);
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