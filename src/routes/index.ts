import React from "react";
import { RouteComponentProps } from "react-router-dom";

import List from "./../pages/List";
import Upload from "./../pages/Upload";

interface Routes {
  path: string;
  exact?: boolean;
  component: React.FC<RouteComponentProps | {}>;
}

/**
 * Routes for the app
 * / -> listing page
 * /upload -> to uplaod the videos
 */
export const routes: Array<Routes> = [
  {
    path: "/",
    exact: true,
    component: List
  },
  {
    path: "/upload",
    component: Upload
  }
];
