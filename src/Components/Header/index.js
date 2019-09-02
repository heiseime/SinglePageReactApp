import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { lightGreen } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  app:{
    color: "#000000",
    backgroundColor: "#fff",
  },
  greenAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: lightGreen[500]
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.app} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            YourLogo
          </Typography>
          <Avatar className={classes.greenAvatar}><NotificationsIcon/></Avatar>
          <Avatar className={classes.greenAvatar}>AB</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
