const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const connectDB = require('./db');

const app = express();

app.use(cors());

connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
