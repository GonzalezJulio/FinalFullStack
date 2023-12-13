import TicketsService from "../service/tickets.service.js";

export default class TicketsController {
  constructor() {
    this.ticketService = new TicketsService();
  }
  async getAllTickets(req, res) {
    try {
      const tickets = await this.ticketService.getAllTickets();
      return res.status(200).json({ status: "success", data: tickets });
    } catch (err) {
      console.log("Error in getting all the tickets", err);
      return res
        .status(500)
        .json({ status: "failure", message: "Internal Server Error" });
    }
  }

  
}
