import { gql } from "apollo-boost";

/**
 * Get File list details query
 */
const GET_FILE_LIST = gql`
  query FileUploadDetails {
    files {
      fileName
      size
      type
    }
  }
`;

export default GET_FILE_LIST;
