import "dotenv/config";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { CustomError } from "../errors/custom-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Return here ensures the request cycle ends after response is sent
      res.status(400).send({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Email in use");
      res.status(400).send({ error: "Email in use" });
      return;
    }

    const user = User.build({ email, password });
    await user.save();

    if (!process.env.JWT_KEY) {
      throw new CustomError("JWT_KEY must be defined");
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    // Here, we're not returning the response, just sending it
    res.status(201).send({
      email: user.email,
      _id: user._id,
    });
  }
);

export { router as signupRouter };
