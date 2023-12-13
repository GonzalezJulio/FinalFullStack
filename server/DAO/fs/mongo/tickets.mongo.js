import { response } from "express";
import ticketsModel from "../../schemas/tickets.schema.js";

export default class TicketsMongo {
    constructor() {
        this.model = ticketsModel;
    }

    async create () {
        try{
            const newTicket = new this.model();
            const response = await newTicket.save();
            return {
                message: "Ticket creado",
                response: response,
            }
        }catch(error){
            return {
                message: error.message,
                response: error.stack, // Devolver la pila de llamadas para facilitar la depuración
              };

        }
    }

    async read () {
        try {
            const response = await ticketsModel.find().lean()
            return response
        } catch (error) {
            throw error
        }
    }
}