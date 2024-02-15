const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginUsageReportingDisabled,
} = require("apollo-server-core");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const conectarDB = require("./config/db");

//Conectar a la DB
conectarDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // console.log(req.headers["authorization"]);
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const usuario = await jwt.verify(token, process.env.SECRETA);
        // console.log(usuario);
        return { usuario };
      } catch (error) {
        console.log("Hubo un error");
        console.log(error);
      }
    }
  },
  plugins: [
    // deshabilitar el plugin de informes de uso
    ApolloServerPluginUsageReportingDisabled(),
  ],
});

server.listen().then(({ url }) => {
  console.log(`Servidor ${url}`);
});
