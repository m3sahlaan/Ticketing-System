import { requireAuth } from "./../../../auth/src/middleware/require-auth";

import express, { Request, Response } from "express";
import { RequestValidationError } from "../../../auth/src/errors/request-validation-error";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  body("title").not().isEmpty().withMessage("Title is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = new Ticket({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    res.send(200).send({ message: "Hello from tickets service" });
  }
);

export { router as createTicketRouter };
