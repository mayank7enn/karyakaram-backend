import express from "express";
import { contactUsSubmit, getVirtualEventRegistrations, virtualEventRegister } from "../controllers/registerController.js";

const router = express.Router();

router.post("/event-register", virtualEventRegister);
router.get("/event-registrations", getVirtualEventRegistrations);
router.post("/contact-us", contactUsSubmit);


export default router;
