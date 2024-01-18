import {Request, Response} from "express";
import mongoose from "mongoose";
import { EventoModelType, EventoModel } from "../db/EventoDB.ts";

export const getEvents = async(_req:Request, res:Response<EventoModelType[]>) => {
    try{
        const fechaActual = new Date(); //new Date devuelve la fecha actual en este formato: 2021-05-31T10:00:00.000Z

        const eventos = await EventoModel.find({fecha: {$gte: fechaActual}}); //gt = greater than

        res.status(200).send(eventos);
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