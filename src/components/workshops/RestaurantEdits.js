import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../Layout";
import environment from "../../environment";
import axios from "axios";
import { useMutation } from "react-query";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Joi from "@hapi/joi";

const schema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  description: Joi.string().trim(),
  avatarURL: Joi.string().uri().trim(),
  imageURL: Joi.string().uri().trim().required(),
  locationURL: Joi.string().trim().uri().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 20,
  },
  media: {
    height: 140,
  },
  title: {
    paddingTop: 10,
    flexGrow: 1,
    fontFamily: "pacifico",
    fontSize: theme.typography.pxToRem(30),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  }));

const RestaurantEdits = () => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [mutate] = useMutation(postRestaurant);

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value;

    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    setData((prev) => ({ ...prev, [fieldName]: value }));
  };


 const handleSubmit = (event) => {
    event.preventDefault();

    const validation = schema.validate(data, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.reduce((acc, current) => {
        return {
          ...acc,
          [current.context.key]: current.message,
        };
      }, {});

      setErrors(errors);

      return;
    }

    mutate({ data });

    const clear = Object.keys(data).reduce((acc, current) => {
      return {
        ...acc,
        [current]: "",
      };
    }, {});

    setData(clear);
  };

  return (
    <Layout backUrl="/">
      <div style={{display: "flex",flexDirection: "column", alignItems:"center", paddingTop: 80 }}>
        <Paper className={classes.root} elevation={3}>
          <div onSubmit={handleSubmit} className={classes.form}>
            <Typography component={"h2"} variant="h4" className={classes.title}>
              New Restaurant
            </Typography>
            <TextField name="name" value={data["name"]} onChange={handleChange("name")} error={errors["name"] ? true : false} helperText={errors["name"]} label="Name" variant="filled"/>
            <TextField name="description" value={data["description"]} onChange={handleChange("description")} error={errors["description"] ? true : false} helperText={errors["description"]} label="Description" variant="filled"/>
            <TextField name="imageURL" value={data["imageURL"]} onChange={handleChange("imageURL")} error={errors["imageURL"] ? true : false} helperText={errors["imageURL"]} label="Image" variant="filled"/>
            <TextField name="locationURL" value={data["locationURL"]} onChange={handleChange("locationURL")} error={errors["locationURL"] ? true : false} helperText={errors["locationURL"]} label="Location" variant="filled"/>
            <Button size="large" onClick={handleSubmit} variant="contained" color="primary">
              Save
            </Button>
          </div>
        </Paper>
      </div>
    </Layout>
  );
};

export default RestaurantEdits;

const postRestaurant = async ({ data }) => {
  const apiUrl = `${environment.apiUrl}/add`;

  await axios.post(apiUrl, data);
};