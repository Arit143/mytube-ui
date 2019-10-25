import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import API_URL from "../constants";

const APP_URI = `${API_URL}/graphql`;

const uploadLink = createUploadLink({ uri: APP_URI });

/**
 * Create Apollo client
 */
const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache()
});

export default client;
