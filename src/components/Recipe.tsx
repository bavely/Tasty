import { useState } from "react";
import { HitType } from "../utils/Interfaces/Interface";
import "../utils/css/recipe.css";
const Recipe = (props: HitType) => {
  const { label, ingredientLines, image, calories, url, totalDaily } = props.recipe;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="recipe-card"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="recipe-header">
        <div className="popover__wrapper">
          <h3 className="recipe-title ">{label}</h3>
          <div className="popover__content">
            <p className="popover__message">{label}</p>
          </div>
        </div>
        <p>
          <span className="calories">Calories:</span> {Math.round(calories)}
        </p>
      </div>
      <div>
      <div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
        <img src={image} alt="recipe" className="recipe-image" />
        </div>
    <div className="flip-card-back">
      <h3>Nutrition Facts:</h3>
      {Object.keys(totalDaily).slice(0, 6).map((key, index) => (
        <p key={index}>
          {key}: {Math.floor(totalDaily[key].quantity) } {totalDaily[key].unit}
        </p>
      ))}
    </div>
  </div>
</div>
      </div>
      <div
        className="recipe-info"
        style={{
          maxHeight: expanded ? "15rem" : 0,
          overflow: expanded ? "auto" : "hidden",
          transition: "0.5s max-height",
          WebkitTransition: "0.5s max-height ",
          MozTransition: "0.5s max-height",
          OTransition: "0.5s max-height",

        }}
      >
        {ingredientLines.map((ingredient, index) => (
          <p key={index}>{ingredient}</p>
        ))}
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default Recipe;
