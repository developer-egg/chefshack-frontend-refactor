import { Container, FloatingLabel, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");

  async function handleSubmit() {
    let trimmedIngredients = ingredients.split(",");
    trimmedIngredients.map((i) => i.trim());
    trimmedIngredients = trimmedIngredients.toString();

    let trimmedProcedure = procedure.split(",");
    trimmedProcedure.map((p) => p.trim());
    trimmedProcedure = trimmedProcedure.toString();

    const bodyFormData = new FormData();
    bodyFormData.append("recipe_title", title);
    bodyFormData.append("recipe_description", description);
    bodyFormData.append("author", window.localStorage.getItem("userID"));
    bodyFormData.append("image", image);
    bodyFormData.append("ingredients", trimmedIngredients);
    bodyFormData.append("procedure", trimmedProcedure);

    axios
      .post(
        "https://chefshack-backend.herokuapp.com/recipes/create_recipe",
        bodyFormData
      )
      .then((res) => {
        window.location.href = "/recipes";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (window.localStorage.getItem("authenticated")) {
    return (
      <Container>
        <h1 className="mt-5">Create Recipe</h1>
        <p>
          Upload your very own recipe to the{" "}
          <Link to="/recipes">recipes page</Link>
        </p>

        <FloatingLabel label="Title" className="mt-4 mb-4">
          <FormControl
            type="text"
            placeholder="Title"
            maxLength={26}
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          label="Image Address/URL (Aspect Ratio Must be Square)"
          className="mt-4 mb-4"
        >
          <FormControl
            type="text"
            placeholder="Image Address/URL"
            required
            onChange={({ target }) => setImage(target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          label="Ingredients (Separate by Comma, Ex. Eggs, Flour, Sugar)"
          className="mt-4 mb-4"
        >
          <FormControl
            type="text"
            placeholder="Ingredients"
            required
            onChange={({ target }) => setIngredients(target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          label="Instructions/Procedure (Separate by Comma, Ex. Add the dry ingredients, Mix for 30 seconds)"
          className="mt-4 mb-4"
        >
          <FormControl
            type="text"
            placeholder="Ingredients"
            required
            onChange={({ target }) => setProcedure(target.value)}
          />
        </FloatingLabel>

        <FloatingLabel label="Description" className="mt-4 mb-4">
          <FormControl
            as="textarea"
            type="text"
            placeholder="Description"
            required
            onChange={({ target }) => setDescription(target.value)}
          />
        </FloatingLabel>

        <Button variant="success" size="lg" onClick={handleSubmit}>
          Create
        </Button>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1 className="mt-5">
          You must be <Link to="/login">signed in</Link> to create a recipe.
        </h1>
      </Container>
    );
  }
};

export default CreateRecipe;
