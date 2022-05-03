import "./App.css";

import { useEffect, useState } from "react";

import axios from "axios";
import Deliveroo from "../src/img/Deliveroo.png";
import Knife from "../src/img/knife.jpeg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [counter, setCounter] = useState([0]);

  // const newCounter = () => {
  //   const newCounter = [...counter]; //copie du TB
  //   newCounter.push(0); // modification de la copie
  //   setCounter(newCounter); //Mise à jour du state avec la copie
  // };

  // const handleClickMinus = (index) => {
  //   const newCounter = [...counter];
  //   newCounter[index]--;
  //   setCounter(newCounter);
  // };

  // const handkeClickPlus = (index) => {
  //   const newCounter = [...counter];
  //   newCounter[index]++;
  //   setCounter(newCounter);
  // };

  // const [addingMeals, setAddingMeals] = useState([]);

  // const addNewMeal = (event) => {
  //   event.preventDefault();
  //   const newMeal = [...addingMeals];
  //   newMeal.push(categories.meals);
  //   setAddingMeals(newMeal);
  // };

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
                <div
                  className="details"
                  onClick={() => {
                    alert("Cliqué");
                  }}
                >
                  {categories.meals.map((meals, index) => {
                    return (
                      <div className="image" key={index}>
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
