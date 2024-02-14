const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginUsageReportingDisabled,
} = require("apollo-server-core");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const usuarioId = 2031;

    return {
      usuarioId,
    };
  },
  plugins: [
    // deshabilitar el plugin de informes de uso
    ApolloServerPluginUsageReportingDisabled(),
  ],
});

server.listen().then(({ url }) => {
  console.log(`Servidor ${url}`);
});
