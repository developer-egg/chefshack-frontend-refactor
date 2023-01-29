import { Link } from "react-router-dom";

const RecipeTile = (props) => {
    return (

        <Link to={`/recipes/${props.id}`} className="recipe-tile-link">
        <div className="recipe-tile">
            <img src={props.image} alt="placeholder" width={256} height={256}/>
            <h2 className="mt-3">{props.title}</h2>
            <p>by {props.author.toUpperCase()}</p>
        </div>
        </Link>
    )
}

export default RecipeTile;