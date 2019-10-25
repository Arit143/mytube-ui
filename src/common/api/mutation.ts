import { gql } from "apollo-boost";

/**
 * File upload mutation
 */
const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFileMutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export default UPLOAD_FILE_MUTATION;
