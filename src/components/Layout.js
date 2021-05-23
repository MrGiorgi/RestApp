import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  topbar: {
    background: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "pacifico",
    fontSize: theme.typography.pxToRem(30),
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    zIndex: 1
  },
}));

const Layout = ({ children, backUrl, actions}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ paddingRight: 5 }}>
        <Toolbar>
          {backUrl && (<IconButton edge="start" color="inherit" component={Link} to={backUrl}>
            <ArrowBackIcon />
          </IconButton>)}
          <Typography variant="h6" className={classes.title}>
            RestApp
          </Typography>
          {actions}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ padding: 20 }}>{children}</Container>

    </div>
  );
}

export default Layout;
