import { errorHandler } from "./../../auth/src/middleware/error-handler";
import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import { NotFoundError } from "./errors/not-found-error";
import { createTicketRouter } from "./routes/new";
import { currentUser } from "./middleware/current-user";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
