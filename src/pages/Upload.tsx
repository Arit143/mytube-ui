import React, { useState, useCallback } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Thumbnail from "./../common/components/Thumbnail";

import { useMutation } from "@apollo/react-hooks";

import UPLOAD_FILE_MUTATION from "../common/api/mutation";

/**
 * Material-ui component for dropzone
 * PS: Not a good component for consumption. React Dropzone is much better
 * It doesn't give an API to handle success. Only client side upload is
 * treated as a success.
 */

const Upload: React.FC = () => {
  const [fileName, setFileName] = useState(undefined);
  const [uploadFile, { data }] = useMutation(UPLOAD_FILE_MUTATION);

  const onChange = useCallback(
    file => {
      if (file.length === 0) {
        setFileName(undefined);
        return false;
      }

      setFileName(file[0].name);
      uploadFile({ variables: { file: file[0] } });
    },
    [uploadFile]
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <DropzoneArea
          onChange={onChange}
          acceptedFiles={["video/mp4", "video/quicktime"]}
          filesLimit={1}
          showPreviews={false}
          maxFileSize={4000000} // 4 MB
          showFileNamesInPreview={false}
          showPreviewsInDropzone={false}
          dropzoneText={"Upload your video here"}
          showAlerts={true}
        />
      </Grid>
      {fileName && (
        <Grid item xs={12} sm={12}>
          <Box display={"flex"} justifyContent={"center"}>
            {data && data!.uploadFile && <Thumbnail fileName={fileName!} />}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Upload;
