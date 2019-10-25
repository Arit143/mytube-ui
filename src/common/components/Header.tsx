import React from "react";
import { Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

import List from "@material-ui/icons/List";
import Publish from "@material-ui/icons/Publish";

import { routes } from "./../../routes";

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      color: theme.palette.primary.dark
    },
    nav: {
      background: theme.palette.primary.contrastText
    }
  };
});

/**
 * The header bar for showing the list of videos and upload the videos
 */
const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <BottomNavigation showLabels className={classes.nav}>
      <BottomNavigationAction
        component={Link}
        to={routes[0].path}
        label="List of Videos"
        value="list"
        icon={<List />}
        className={classes.root}
      />
      <BottomNavigationAction
        component={Link}
        to={routes[1].path}
        label="Upload Video"
        value="upload"
        icon={<Publish />}
        className={classes.root}
      />
    </BottomNavigation>
  );
};

export default Header;
