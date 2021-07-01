/* eslint-disable no-console */
import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

const events = [];

app.use(bodyParser.json());

app.use("/graphql", graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventName: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return events;
    },
    createEvent: args => {
      const event = {
        _id: Math.random().toString(),
        title: args.eventName.title,
        description: args.eventName.description,
        price: args.eventName.price,
        date: args.eventName.date
      };
      events.push(event);
      return event;
    }
  },
  graphiql: true
}));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res, next) => {
  res.send("hello world");
});