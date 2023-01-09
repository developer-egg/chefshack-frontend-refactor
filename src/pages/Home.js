import { Container, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container>

      <div className="mb-5">
        <h1 className="display-1 mt-5 mb-5">Find and Share Recipes with <span className="underline text-success">ChefShack</span></h1>
        <h3 className="fw-light">
          ChefShack is a community where everyone from home cooks to professional
          chefs come together to share and discover recipes.
        </h3>

        <Button onClick={() => {
          window.location.href = "/recipes"
        }} className="mt-4 mb-3" variant="success" size="lg">Get Started</Button>
        <hr/>
      </div>

      <div className="mt-5 mb-5">
        <h1 className="display-4 mb-3">What is ChefShack?</h1>
        <p className="lead">Welcome to Chefshack! We are a community of home cooks and professional chefs who love sharing our recipes with others. On our site, you can browse through a wide variety of dishes, from classic comfort foods to international specialties. You can also upload your own recipes and share them with the Chefshack community.</p>
      </div>
    </Container>
  );
};

export default Home;
