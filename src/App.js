import "./App.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Deliveroo from "../src/img/Deliveroo.png";
import { specialCharMap } from "@testing-library/user-event/dist/keyboard";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="App">
      <div className="header">
        <img alt="deliveroo logo" src={Deliveroo} />
      </div>

      <div className="restaurant-presentation">
        <h1>{data.restaurant.name}</h1>
        <div className="bottom-element">
          <p>{data.restaurant.description}</p>
          <img src={data.restaurant.picture} alt="Photo du restaurant" />
        </div>
      </div>

      <div className="categories">
        {data.categories.map((categories, index) => {
          return <h2 key={index}>{categories.name}</h2>;
        })}
        <div className="details">
          {data.categories.meals.map((meals, index) => {
            return <h3 key={index}>{meals.title}</h3>;
          })}
        </div>
        {/* 
        {data.categories.map((meals, index) => {
          return <h3 key={index}>{categories.meals}</h3>;
        })} */}
      </div>
    </div>
  );
}

export default App;
