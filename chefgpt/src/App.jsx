import React, { useState } from "react";
import "./App.css";
import chefLogo from "./assets/chef-claude-icon.png";

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([
    "Chicken breasts",
    "Most of the main spices",
    "Olive oil",
    "Heavy cream",
    "Chicken broth",
    "Parmesan cheese",
    "Spinach",
  ]);

  function addIngredient(e) {
    e.preventDefault();

    if (ingredient.trim() === "") return;

    setIngredients((prev) => [...prev, ingredient]);
    setIngredient("");
  }

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <img src={chefLogo} alt="Chef Claude Logo" className="logo" />
        <h1>Chef Claude</h1>
      </header>

      {/* FORM */}
      <form className="ingredient-form" onSubmit={addIngredient}>
        <input
          type="text"
          placeholder="e.g. oregano"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />

        <button type="submit">+ Add ingredient</button>
      </form>

      {/* INGREDIENTS */}
      <section className="ingredients-section">
        <h2>Ingredients on hand:</h2>

        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* RECIPE CARD */}
      <section className="recipe-card">
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>

        <button>Get a recipe</button>
      </section>
    </div>
  );
}