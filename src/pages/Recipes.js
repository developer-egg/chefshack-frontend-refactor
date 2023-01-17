import { Container, Col, Row } from "react-bootstrap";
import RecipeTile from "../components/RecipeTile";

const Recipes = () => {
    return (
        <Container>
            <div className="mt-5 mb-5">
                <h1 className="text-center">Explore Recipes</h1>
                <p className="text-center lead">or search by <span className="underline text-success">cuisine</span></p>
            </div>

            <Row className="gy-3">
                <Col className="d-flex justify-content-center" lg={4} md={6}>
                    <RecipeTile title="Title" author="John Doe"/>
                </Col>

                <Col className="d-flex justify-content-center" lg={4} md={6}>
                    <RecipeTile title="Title" author="John Doe"/>
                </Col>

                <Col className="d-flex justify-content-center" lg={4}md={6}>
                    <RecipeTile title="Title" author="John Doe"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Recipes;