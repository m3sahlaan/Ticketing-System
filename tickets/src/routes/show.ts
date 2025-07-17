import axios from "axios";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { requireAuth } from "../middleware/require-auth";

const router = express.Router();

router.get("/api/tickets:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new Error("Ticket ID is required");
  }
    
  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  res.send(ticket);
});

export { router as showTicketRouter };
