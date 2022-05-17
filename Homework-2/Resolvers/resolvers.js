const data = require("../Data/data.json");
const { nanoid } = require("nanoid");

const { events, locations, users, participants } = data;

const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("userCreated"),
    },
    eventCreated: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterator("eventCreated"),
    },
  },

  Mutation: {
    // User
    createUser: (parent, { data }, { pubsub }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      pubsub.publish("userCreated", { userCreated: user });
      return user;
    },

    updateUser: (parent, { id, data }) => {
      const userIndex = users.findIndex((user) => user.id === +id);
      if (userIndex === -1) {
        throw new Error("User Not Found ");
      }

      users[userIndex].username = data.username;
      users[userIndex].email = data.email;

      return users[userIndex];
    },

    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex((user) => user.id === +id);
      if (userIndex === -1) {
        throw new Error("User Not Found");
      }

      let removeUser = users[userIndex];
      users.splice(userIndex, 1);
      return removeUser;
    },

    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },

    // Event
    createEvent: (parent, { data }, { pubsub }) => {
      const event = { id: nanoid(), ...data, user_id: +data.user_id };
      events.push(event);
      pubsub.publish("eventCreated", { eventCreated: event });
      return event;
    },

    updateEvent: (
      parent,
      { id, data: { title, desc, date, from, to, location_id, user_id } }
    ) => {
      const eventIndex = events.findIndex((event) => event.id === +id);

      if (eventIndex === -1) {
        throw new Error("Event Not Found");
      }

      events[eventIndex].title = title;
      events[eventIndex].desc = desc;
      events[eventIndex].date = date;
      events[eventIndex].from = from;
      events[eventIndex].to = to;
      events[eventIndex].location_id = location_id;
      events[eventIndex].user_id = user_id;

      return events[eventIndex];
    },

    deleteEvent: (parent, { id }) => {
      const eventIndex = events.findIndex((event) => event.id === +id);
      if (eventIndex === -1) {
        throw new Error("Event Not Found");
      }

      const removeEvent = events[eventIndex];
      events.splice(eventIndex, 1);
      return removeEvent;
    },

    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);

      return {
        count: length,
      };
    },

    // Location
    createLocation: (parent, { data }) => {
      const location = {
        id: nanoid(),
        ...data,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
      };
      locations.push(location);
      return location;
    },

    updateLocation: (parent, { id, data: { name, desc, lat, lng } }) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === +id
      );
      if (locationIndex === -1) {
        throw new Error("Location id not found");
      }

      locations[locationIndex].name = name;
      locations[locationIndex].desc = desc;
      locations[locationIndex].lat = lat;
      locations[locationIndex].lng = lng;

      return locations[locationIndex];
    },

    deleteLocation: (parent, { id }) => {
      const locationIndex = locations.findIndex(
        (location) => location.id === +id
      );
      if (locationIndex === -1) {
        throw new Error("Not found location");
      }
      const removeLocation = locations[locationIndex];
      locations.splice(locationIndex, 1);
      return removeLocation;
    },

    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);

      return {
        count: length,
      };
    },

    // Participant
    createParticipat: (parent, { data }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      return participant;
    },

    updateParticipant: (parent, { id, data }) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === +id
      );

      if (participantIndex === -1) {
        throw new Error("Not found Participant");
      }

      participants[participantIndex].event_id = +data.event_id;
      participants[participantIndex].user_id = +data.user_id;

      return participants[participantIndex];
    },

    deleteParticipant: (parent, { id }) => {
      const participantIndex = participants.findIndex(
        (participant) => participant.id === +id
      );

      if (participantIndex === -1) {
        throw new Error("Not found participant");
      }

      const removeParticipant = participants[participantIndex];
      participants.splice(participantIndex, 1);

      return removeParticipant;
    },

    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);

      return {
        count: length,
      };
    },
  },

  Query: {
    // Events Resolvers
    events: () => events,
    event: (_, args) => {
      if (args.id < 1) {
        throw new Error("No event found matching this ID");
      }
      const data = events.find((event) => event.id === +args.id);
      return data;
    },

    // Location Resolvers
    locations: () => locations,
    location: (_, args) => {
      if (args.id < 1) {
        throw new Error("No location found matching this ID");
      }
      const data = locations.find((location) => location.id === +args.id);
      return data;
    },

    // User Resolvers
    users: () => users,
    user: (_, args) => {
      if (args.id < 1) {
        throw new Error("No user found matching this ID");
      }
      const data = users.find((user) => user.id === +args.id);
      return data;
    },

    // Participant Resolvers
    participants: () => participants,
    participant: (_, args) => {
      if (args.id < 1) {
        throw new Error("No participant fount matching this ID");
      }
      const data = participants.find(
        (participant) => participant.id === +args.id
      );
      return data;
    },
  },

  User: {
    event: (parent, args) => {
      const data = events.filter((event) => event.user_id === parent.id);
      return data;
    },
  },

  Event: {
    user: (parent, args) => {
      const data = users.find((user) => user.id === parent.user_id);
      return data;
    },
    location: (parent, args) => {
      const data = locations.find(
        (location) => location.id === parent.location_id
      );
      return data;
    },
    participants: (parent, args) => {
      const data = participants.filter(
        (participant) => participant.event_id === parent.id
      );
      return data;
    },
  },

  Participant: {
    users: (parent, args) => {
      const data = users.filter((user) => user.id === parent.user_id);
      return data;
    },
  },
};

module.exports = { resolvers };
