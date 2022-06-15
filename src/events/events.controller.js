import { Router } from "express";
import { ObjectId } from "mongodb";
import {
  getEventById,
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
} from "./events.service.js";

const router = Router();

// Get
router.get("/", async (req, res) => {
  console.log("get");
  const { id, type, limit, page } = req.query;
  const eventsCollection = req.db.collection("events");
  if (id) {
    const events = await getEventById(eventsCollection, id);
    return res.json(events);
  }
  const event = await getAllEvents(eventsCollection, type, limit, page);

  return res.json(event);
});

// Create
router.post("/", async (req, res) => {
  console.log("post");
  const eventId = await createEvent(req.db.collection("events"), req.body);
  return res.json({
    id: eventId,
  });
});

// Update
router.put("/:id", async (req, res) => {
  console.log("put");
  const { id } = req.params;
  const ok = await updateEvent(req.db.collection("events"), id, req.body);
  return res.json({
    id,
    ok,
  });
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const ok = await deleteEvent(req.db.collection("events"), id);
  return res.json({
    id,
    ok,
  });
});

export default router;
