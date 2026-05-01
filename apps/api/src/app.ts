import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { optionalAuth } from "./middleware/auth.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { billsRouter } from "./modules/bills/bills.routes.js";
import { dishesRouter } from "./modules/dishes/dishes.routes.js";
import { ownerRouter } from "./modules/owner/owner.routes.js";
import { restaurantsRouter } from "./modules/restaurants/restaurants.routes.js";
import { reviewsRouter } from "./modules/reviews/reviews.routes.js";
import { searchRouter } from "./modules/search/search.routes.js";
import { usersRouter } from "./modules/users/users.routes.js";
import { success } from "./utils/api-response.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.WEB_URL,
      credentials: true
    })
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json({ limit: "5mb" }));
  app.use(optionalAuth);

  app.get("/health", (_req, res) => {
    res.json(
      success({
        status: "ok"
      })
    );
  });

  app.use("/v1/auth", authRouter);
  app.use("/v1", usersRouter);
  app.use("/v1/restaurants", restaurantsRouter);
  app.use("/v1/dishes", dishesRouter);
  app.use("/v1/reviews", reviewsRouter);
  app.use("/v1/bills", billsRouter);
  app.use("/v1", searchRouter);
  app.use("/v1/owner", ownerRouter);
  app.use("/v1/admin", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
