const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginUsageReportingDisabled,
} = require("apollo-server-core");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

const conectarDB = require("./config/db");

//Conectar a la DB
conectarDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    // deshabilitar el plugin de informes de uso
    ApolloServerPluginUsageReportingDisabled(),
  ],
});

server.listen().then(({ url }) => {
  console.log(`Servidor ${url}`);
});
