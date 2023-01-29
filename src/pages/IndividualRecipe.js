import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const IndividualRecipe = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [procedure, setProcedure] = useState([""]);

  const [isLoading, setIsLoading] = useState(true);

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
        .finally((err) => {
          setIsLoading(false);
        });
    }
    getRecipe();
  }, []);

  if (!isLoading) {
    return (
      <Container>
        <h1 className="display-3 mt-5">{title}</h1>
        <h3 className="fw-light">by {author}</h3>
        <p className="lead mt-4">{getCleanDate(pubDate)}</p>

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
