import React, { memo, useState } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Thumbnail from "../common/components/Thumbnail";
import API_URL from "../common/constants";

export interface FileDetails {
  fileName: string;
  size: number;
  type: string;
}

/**
 * Get all the uploaded videos and list them
 * with file name, file size, file type, thumbnails and streaming of video
 */
const ListDetails: React.FC<FileDetails> = (props: FileDetails) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const { fileName, size, type } = props;

  const onWatchVideo = () => {
    setShowVideo(true);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">File Name: {fileName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6}>
            <Box>
              <Typography variant="caption">
                File Size: {(size / (1028 * 1028)).toFixed(2)} MB
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">File Type: {type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {!showVideo ? (
              <Box data-testid="thumbnail">
                <Thumbnail fileName={fileName} />
              </Box>
            ) : (
              <video
                id="videoPlayer"
                controls
                muted={false}
                width={"100%"}
                autoPlay={true}
              >
                <source
                  src={`${API_URL}/stream/${fileName}`}
                  type="video/mp4"
                />
              </video>
            )}
            <Button variant="contained" color="primary" onClick={onWatchVideo}>
              Watch Video
            </Button>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default memo(ListDetails);
