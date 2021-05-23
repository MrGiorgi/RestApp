import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    width: "100%",
    borderRadius: 4,
    borderBottom: "1px solid #dbdbdb",
  },
  media: {
    height: 180,
  },
  buttonleft: {
    marginLeft: "auto!important",
  },
  });

const RestaurantLoading = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
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

export default RestaurantLoading;