import {Request, Response} from "express";

export const holamundo = async(req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!");
}