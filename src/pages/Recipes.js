import { Container, Col, Row, Spinner } from "react-bootstrap";
import RecipeTile from "../components/RecipeTile";

import { useEffect, useState } from "react";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fillRecipeList() {
    await axios
      .get("http://localhost:8000/recipes/get_all_recipes")
      .then((res) => {
        setRecipes(res.data.recipes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // since all axios calls are done at this point, set isLoading to false
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fillRecipeList();
  }, []);

  if (!isLoading) {
    return (
      <Container>
        <div className="mt-5 mb-5">
          <h1 className="text-center">Explore Recipes</h1>
          <p className="text-center lead">
            or search by <span className="underline text-success">cuisine</span>
          </p>
        </div>

        <Row className="gy-5">
          {recipes.map((recipe) => (
            <Col className="d-flex justify-content-center" lg={4} md={6}>
              <RecipeTile
                title={recipe.recipe_title}
                author={recipe.username}
                image={recipe.image}
                id={recipe.id}
                likes={recipe.likes}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  } else {
    return <Spinner id="spinner" animation="border" variant="success" />;
  }
};

export default Recipes;
