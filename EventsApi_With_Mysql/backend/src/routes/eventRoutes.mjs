import express from "express";
import { eventValidator } from "../utils/validationSchema.mjs";
import { validateToken } from "../utils/tokenvalidator.mjs";
import { resolveEventByIndex } from "../utils/helperFunction/resolveEventByIndex.mjs";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  partialUpdateEvent,
  deleteEvent,
} from "../controllers/eventController.mjs";

const router = express.Router();

// Declare your routes
router.route("/events").get(getAllEvents);
router
  .route("/events/:id")
  .get(resolveEventByIndex, getEventById);
router.route("/events").post(eventValidator, createEvent);
router
  .route("/events/:id")
  .put(eventValidator, resolveEventByIndex, updateEvent);
router
  .route("/events/:id")
  .patch(eventValidator, resolveEventByIndex, partialUpdateEvent);
router.route("/events/:id").delete(resolveEventByIndex, deleteEvent);

export default router;
