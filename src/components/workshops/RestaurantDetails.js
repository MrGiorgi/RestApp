import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Layout from "../Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery, useMutation, queryCache } from "react-query";
import { useParams } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertIcon from "@material-ui/icons/MoreVert";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 4,
    borderBottom: "1px solid #dbdbdb",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
  }));

const featuresLabels = {
  liveMusic: () => "Hay música en vivo",
  outdoorOption: (value) => `Tiene espacios al aire libre ${value}`,
};

const queryRestaurantDetails = "restaurant";
const RestaurantDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { isLoading, data: restaurant = {}, error } = useQuery([queryRestaurantDetails, id], getRestaurant);
  const { Like, name, description, avatarURL, countries, contact, features, imageURL, locationURL, location} = restaurant

 const [mutateLike, { status: likeStatus, error: likeError }] = useMutation(
  postLike, {
    onSuccess: () => {
      queryCache.invalidateQueries(queryRestaurantDetails);
    },
 });

  return (
    <Layout backUrl="/">
      <div style={{display: "flex", flexDirection: "column", alignItems:"center", gap:50, paddingTop: 80 }}>
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar alt={name} src={avatarURL} className={classes.avatar}/>}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Giorgi Alejandro Sosa"
            subheader="April 03, 2021"
          />
            <CardMedia
              className={classes.media}
              image= {imageURL}
              title={name}
            />
            <CardContent style={{display: "flex", flexDirection: "column", gap: "20px"}}>
              <div>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </div>
              <div style={{ display: "flex", gap: "5px"}}>
                <Typography variant="subtitle1" color="textSecondary" component="span">
                  Localicación:
                </Typography>
                <a href={locationURL} rel="noopener noreferrer" target="_blank">
                <Typography variant="subtitle1" color="textSecondary" component="span">
                  {`${location}, ${countries}`}
                </Typography>
                </a>
              </div>
              <div>
                <Typography gutterBottom variant="h5" color="textSecondary" component="h2">
                  Features:
                </Typography>
                {features && Object.keys(features).map((key) => (
                  <React.Fragment key={`feature-${key}`}>
                    {features[key] && (<div style={{ display: "flex", gap: "5px", marginTop: 5 }}>
                      <Typography gutterBottom variant="subtitle1" color="textSecondary" component="span">
                        {featuresLabels[key](features[key])}
                      </Typography>
                    </div>
                    )}
                  </React.Fragment>
                  ))}
              </div>
              <div>
                <Typography gutterBottom variant="h5" color="textSecondary" component="h2">
                  Contact Us:
                </Typography>
                {contact && contact.map((contact, index) => (
                  <div key={`contact-${index}`} style={{ display: "flex", gap: "5px", marginTop: 10 }}>
                    <a href={contact.link} rel="noopener noreferrer" target="_blank">
                      <Typography gutterBottom variant="subtitle1" color="textSecondary" component="span">
                        {formatSocialNetwork(contact)}
                      </Typography>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          <CardActions>
          {Like}
          <Tooltip title="Add to favorites" aria-label="Add to favorites">
            <IconButton disabled={["success", "loading"].includes(likeStatus)} onClick={() => mutateLike({ id })} aria-label="Add to favorites">
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
      </div>
    </Layout>
  );
};

export default RestaurantDetails;

const formatSocialNetwork = ({ socialNetwork, link }) => {
  if (socialNetwork === "Instagram") {
    const linkArr = link.split("/");
    return `@${linkArr[linkArr.length - 1]}`;
  };
  return socialNetwork;
};

const getRestaurant = async (_, id) => {
  const apiUrl = `${environment.apiUrl}/${id}`;
  const { data } = await axios.get(apiUrl);
  return data;
};

const postLike = async ({ id }) => {
  const apiUrl = `${environment.apiUrl}/${id}/like`;
  return await axios.post(apiUrl);
};