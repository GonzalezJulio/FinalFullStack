import dao from "../DAO/Factory.js";

const { Ticket } = dao;

export default class TicketsRepository {
    constructor() {
        this.model = new Ticket();

    }

    create = async (ticket) => {
        try{
            const result = await this.model.create(ticket);
            return result[0];
        }catch(error){
            console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
        }
    }
    readAll = async () => {
        const tickets = await this.model.readAll();
        if (!tickets.length) throw new Error("No hay registros");
        else return tickets;
        }
}