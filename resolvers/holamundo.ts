import {Request, Response} from "express";

export const holamundo = (_req: Request, res: Response) => {
    res.status(200).send("Hola Mundo!");
}