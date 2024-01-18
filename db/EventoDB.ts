import mongoose, { InferSchemaType } from "mongoose";

const Schema = mongoose.Schema;

const EventoSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: false, default: ""},
    fecha: {type: Date, required: true},
    inicio: {type: Number, required: true}, //Hora Inicio
    fin: {type: Number, required: true}, //Hora Fin
    invitados: [{ //Array de personas con nombre y apellido
        nombre: {type: String, required: true},
        apellido: {type: String, required: true}, required: true
    }]
})

EventoSchema.path("inicio").validate(function (inicio:number) {
    if(inicio > 24 || inicio < 1){
        throw new Error("La hora de inicio ha de estar comprendida entre 1 y 24");
    }
    return true;
})

EventoSchema.path("fin").validate(function (fin:number) {
    if(fin > 24 || fin < 1){
        throw new Error("La hora de finalizacion ha de estar comprendida entre 1 y 24");
    }
    if(fin < this.inicio){
        throw new Error("La hora de fin no puede ser menor que la de inicio")
    }
    return true;
})

EventoSchema.path("fecha").validate(async function (fecha: Date) {
    //si coincide con algun evento de la BBDD en fecha y hora, no se puede crear
    //si no coincide con ninguno, se puede crear
    //si coincide con algun evento de la BBDD en fecha pero no en hora, se puede crear
    const eventos = await EventoModel.find({fecha: fecha});
    eventos.forEach((evento:EventoModelType) => {
        if((this.inicio == evento.inicio) ||
        (this.inicio > evento.inicio && this.inicio < evento.fin) ||
        (this.fin > evento.inicio && this.fin < evento.fin) ||
        (this.inicio < evento.inicio && this.fin > evento.fin)){
            throw new Error("Ya existe un evento en esa fecha y hora")
        }
    })
    return true;
})

export type EventoModelType = mongoose.Document & InferSchemaType<typeof EventoSchema>;

export const EventoModel = mongoose.model<EventoModelType>("Evento", EventoSchema);