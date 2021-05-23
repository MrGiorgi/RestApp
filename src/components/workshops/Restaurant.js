import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 4,
    borderBottom: "1px solid #dbdbdb",
  },
  media: {
    height: 220,
  },
  buttonleft: {
    marginLeft: "auto!important",
  },
  title: {
    paddingTop: 10,
    flexGrow: 1,
    fontFamily: "pacifico",
    fontSize: theme.typography.pxToRem(26),
  },
  }));

const Restaurant = ({ value }) => {
  const classes = useStyles();

  const { name, description, imageURL, _id } = value;

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/restaurant/${_id}`}>
        <CardMedia
          className={classes.media}
          image= {imageURL}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Tooltip title="Add to favorites" aria-label="Add to favorites">
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share" aria-label="Share">
        <IconButton className={classes.buttonleft} aria-label="Share">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Restaurant;