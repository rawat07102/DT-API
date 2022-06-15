import { ObjectId } from "mongodb";

export const createEvent = async (eventsCollection, createEventDto) => {
  const result = await eventsCollection.insertOne(createEventDto);
  return result.insertedId;
};

export const getEventById = async (eventsCollection, id) => {
  const event = await eventsCollection.findOne(ObjectId(id));
  return event;
};

export const getAllEvents = async (
  eventsCollection,
  type = "latest",
  limit = 10,
  page = 0
) => {
  if (type === "latest") {
    const events = await eventsCollection
      .find({})
      .limit(limit)
      .skip(page * limit)
      .toArray();
    return events;
  }
};

export const updateEvent = async (eventsCollection, id, createEventDto) => {
  const result = await eventsCollection.findOneAndUpdate(
    ObjectId(id),
    createEventDto
  );
  return result.ok;
};

export const deleteEvent = async (eventsCollection, id) => {
  const result = await eventsCollection.findOneAndDelete({ _id: ObjectId(id) });
  return result.ok;
};
