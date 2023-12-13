import TicketsRepository from "../repositories/tickets.repository.js";

export default class TicketsService {
  constructor() {
    this._repo = new TicketsRepository();
  }

  create = async () => {
    try{
        const ticketId = await this._repo.createTicket();
        return {ticketId};

    } catch(error){
        console.log(error);
            return {
                message: error.message,
                response: error.name,
            };

    }
  }
  getAll = async (page) => {
    try{
        let response = await this._repo.readAll()
        return response;

    }catch(error){
        console.log(error);
            return {
                message: error.message,
                response: error.name,
            };

    }

  }


}
