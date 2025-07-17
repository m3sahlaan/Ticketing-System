import { body } from "express-validator";
import axios from "axios";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { requireAuth } from "../middleware/require-auth";
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizeError } from "../errors/not-authorize-error";

const router = express.Router();

router.put(
  "/api/tickets:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new NotFoundError();
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizeError();
    }

    const { title, price } = req.body;

    ticket.set({ title, price });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
