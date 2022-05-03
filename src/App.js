import "./App.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Deliveroo from "../src/img/Deliveroo.png";
import Knife from "../src/img/knife.jpeg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [addingMeals, setAddingMeals] = useState([]);

  // const [counter, setCounter] = useState([0]);

  const basket = (event) => {
    event.preventDefault();
    const newMeal = [...addingMeals]; //copie du TB
    newMeal.push(0); // modification de la copie
    setAddingMeals(newMeal); //Mise à jour du state avec la copie
  };

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
          const isArrayOfMealsEmpty = categories.meals.length;
          return (
            isArrayOfMealsEmpty > 0 && (
              <div className="name-category" key={index}>
                <h2>{categories.name}</h2>
                <div className="details">
                  {categories.meals.map((meals, index) => {
                    return (
                      <div
                        className="image"
                        key={index}
                        onClick={() => {
                          console.log(meals.title);
                          console.log(meals.price);
                        }}
                      >
                        <h3> {meals.title}</h3>
                        <p>{meals.description}</p>
                        <p>{meals.price}</p>
                        <div>{meals.popular ? <span>populaire</span> : ""}</div>
                        <div className="meals-picture">
                          {meals.picture ? (
                            <img src={meals.picture} alt="menus images" />
                          ) : (
                            <img src={Knife} />
                          )}
                        </div>

                        <div className="basket"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default App;
