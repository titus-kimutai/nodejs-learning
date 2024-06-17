import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware to resolve event by ID
export const resolveEventByIndex = async (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  try {
    const event = await prisma.event.findUnique({
      where: { id: parsedId },
    });

    if (!event) return res.sendStatus(404);

    req.event = event;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to resolve event",
    });
  }
};
