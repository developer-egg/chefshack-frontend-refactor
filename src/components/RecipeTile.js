import { Link } from "react-router-dom";
import star from "../images/star-filled.png"

const RecipeTile = (props) => {
    return (

        <Link to={`/recipes/${props.id}`} className="recipe-tile-link">
        <div className="recipe-tile">
            <img src={props.image} alt="placeholder" width={256} height={256}/>
            <h2 className="mt-3">{props.title}</h2>

            <div id="recipe-tile-star-area">
                <p id="recipe-tile-star-counter">{props.likes}</p>
                <img id="recipe-tile-star" src={star} alt="star" height={24} width={24}/>
            </div>

            <p>by {props.author.toUpperCase()}</p>
        </div>
        </Link>
    )
}

export default RecipeTile;