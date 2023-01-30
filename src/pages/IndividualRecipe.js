import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import starFilled from "../images/star-filled.png";
import starOutline from "../images/star-outline.png";

const IndividualRecipe = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [procedure, setProcedure] = useState([""]);

  const [isLoading, setIsLoading] = useState(true);

  const [isStarFilled, setIsStarFilled] = useState(false);

  let { id } = useParams();

  function getCleanDate(date) {
    const monthNames = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    const monthName = monthNames[month - 1];

    return `${monthName} ${day}, ${year}`;
  }

  function likeButtonHandler() {
    if (!isStarFilled) {
      if (window.localStorage.getItem("authenticated")) {
        setIsStarFilled(true);

        console.log(
          `Username on recipe page is: ${window.localStorage.getItem(
            "username"
          )}`
        );

        const bodyFormData = new FormData();
        bodyFormData.append(
          "username",
          window.localStorage.getItem("username")
        );

        bodyFormData.append("recipeID", id);

        axios
          .post(
            "https://chefshack-backend.herokuapp.com/members/like_recipe",
            bodyFormData
          )
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (window.localStorage.getItem("authenticated")) {
        setIsStarFilled(false);

        const bodyFormData = new FormData();

        bodyFormData.append(
          "username",
          window.localStorage.getItem("username")
        );
        bodyFormData.append("recipeID", id);

        axios
          .post(
            "https://chefshack-backend.herokuapp.com/members/unlike_recipe",
            bodyFormData
          )
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  useEffect(() => {
    function getRecipe() {
      const bodyFormData = new FormData();
      bodyFormData.append("id", id);

      axios
        .post(
          "https://chefshack-backend.herokuapp.com/recipes/get_recipe",
          bodyFormData
        )
        .then((res) => {
          setTitle(res.data.recipe_title);
          setAuthor(res.data.username);
          setImage(res.data.image);
          setPubDate(res.data.pub_date);
          setDescription(res.data.recipe_description);
          setIngredients(res.data.ingredients);
          setProcedure(res.data.procedure);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    function checkIfRecipeIsLiked() {
      if (!window.localStorage.getItem("authenticated")) {
        return;
      }

      const username = window.localStorage.getItem("username");

      axios
        .get(
          `https://chefshack-backend.herokuapp.com/members/get_user_by_name/${username}`
        )
        .then((res) => {
          for (const recipeId of res.data.likedRecipes) {
            if (recipeId === id) {
              // fill in the like button if the recipe is already liked
              setIsStarFilled(true);
            }
          }
        })
        .finally(() => {
          // since all axios calls are done at this point, set isLoading to false
          setIsLoading(false);
        });
    }

    getRecipe();
    checkIfRecipeIsLiked();
  }, []);

  if (!isLoading) {
    return (
      <Container>
        <h1 className="display-3 mt-5">{title}</h1>
        <h3 className="fw-light">by {author}</h3>
        <p className="lead mt-4">{getCleanDate(pubDate)}</p>

        <div id="recipe-page-like-area">
          <p className="lead" id="recipe-page-like-counter">
            Like this recipe? Give it a star!
          </p>
          <button
            id="recipe-page-like-button"
            onClick={() => {
              likeButtonHandler();
            }}
          >
            <img
              id="recipe-page-like-image"
              src={isStarFilled ? starFilled : starOutline}
              alt="star"
              height={32}
              width={32}
            ></img>
          </button>
        </div>
        <img />

        <img
          className="recipe-page-image mt-4"
          src={image}
          alt={title}
          height={512}
          width={512}
        ></img>

        <p className="mt-5 lead">{description}</p>

        <h3 className="display-5">Ingredients</h3>
        <ol>
          {ingredients.map((x) => (
            <li>{x}</li>
          ))}
        </ol>

        <h3 className="display-5 mt-3">Procedure</h3>
        <ol>
          {procedure.map((x) => (
            <li>{x}</li>
          ))}
        </ol>
      </Container>
    );
  } else {
    return (
      <Container fluid className="d-flex justify-content-center">
        <Spinner id="spinner" animation="border" variant="success" />
      </Container>
    );
  }
};

export default IndividualRecipe;
