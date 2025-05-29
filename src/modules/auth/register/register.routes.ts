import { Router } from "express";
import { emailRequestHandler, registerDetailsHandler, verifyEmailHandler } from "./register.controller";

const router = Router();

router
    .post("/email", emailRequestHandler)
    .post("/verify-email", verifyEmailHandler)
    .post("/details", registerDetailsHandler);

export default router;