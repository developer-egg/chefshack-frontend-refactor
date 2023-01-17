const RecipeTile = (props) => {
    return (
        <div className="recipe-tile">
            <img src="https://www.healthylifestylesliving.com/wp-content/uploads/2015/12/placeholder-256x256.gif" alt="placeholder" />
            <h2 className="mt-3">{props.title}</h2>
            <p>by {props.author.toUpperCase()}</p>
        </div>
    )
}

export default RecipeTile;