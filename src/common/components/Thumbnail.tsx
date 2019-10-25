import React, { memo } from "react";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import API_URL from "../constants";

interface Props {
  fileName: string;
  width: Breakpoint;
}

/**
 * Show thumbnail while the video is uploaded and also while listing
 */
const Thumbnail: React.FC<Props> = (props: Props) => {
  return (
    <img
      style={{
        maxWidth: !isWidthUp("sm", props.width) ? "100%" : "50%"
      }}
      src={`${API_URL}/videos/thumbnails/${props.fileName}.png`}
      alt="thumbnail"
    />
  );
};

export default withWidth()(memo(Thumbnail));
