import { PrismaClient } from "@prisma/client";
import { validationResult, matchedData } from "express-validator";

const prisma = new PrismaClient();

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({
      status: "success",
      data: { events },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve events",
    });
  }
};

//creating new events
export const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { imageUrl, title, date, location, company, price } =
      matchedData(req);
    const isoDate = new Date(date).toISOString();

    const newEvent = await prisma.event.create({
      data: {
        imageUrl,
        title,
        date: isoDate,
        location,
        company,
        price,
      },
    });

    res.cookie("eventData", JSON.stringify(newEvent), {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create event",
    });
  }
};

// Get a single event by id
export const getEventById = async (req, res) => {
  try {
    const { event } = req; 
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve event",
    });
  }
};

// Update an event completely (PUT)
export const updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { imageUrl, title, date, location, company, price } =
      matchedData(req);
    const isoDate = new Date(date).toISOString();
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        imageUrl,
        title,
        date: isoDate,
        location,
        company,
        price,
      },
    });

    res.status(200).json({
      status: "success",
      data: { updatedEvent },
    });
  } catch (error) {
    console.error("Failed to update event:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update event",
    });
  }
};
// Partially update an event (PATCH)
export const partialUpdateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { date, ...updateData } = matchedData(req);
    let isoDate = date;
    if (date) {
      isoDate = new Date(date).toISOString();
    }

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        date: isoDate,
      },
    });

    res.status(200).json({
      status: "success",
      data: { updatedEvent },
    });
  } catch (error) {
    console.error("Failed to partially update event:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update event",
    });
  }
};

// Delete an event by id
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete event",
    });
  }
};
