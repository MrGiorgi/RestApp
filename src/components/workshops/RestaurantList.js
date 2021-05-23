import React from "react";
import Restaurant from "./Restaurant";
import RestaurantLoading from "./RestaurantLoading";
import Layout from "../../components/Layout";
import environment from "../../environment";
import axios from "axios";
import { useQuery } from "react-query";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";


const RestaurantList = () => {
  const { isLoading, data: restaurants, error } = useQuery('restaurants', getRestaurants);

  return (
  <Layout actions={ <Button color="inherit" component={Link} to={"/restaurant/create"}>Add Restaurant</Button>}>
    <div style={{display: "flex",flexDirection: "column", alignItems:"center", gap:50, paddingTop: 80 }}>
      {restaurants
        && restaurants.map((restaurant) => (
           <Restaurant key={`restaurant-${restaurant._id}`} value={restaurant}/> ))}
        {isLoading && (
          <>
            <RestaurantLoading />
            <RestaurantLoading />
            <RestaurantLoading />
          </>
        )}
    </div>
  </Layout>
  );
};

export default RestaurantList;

const getRestaurants = async () => {
  const apiUrl = environment.apiUrl;
  const { data } = await axios.get(apiUrl);
  return data;
};