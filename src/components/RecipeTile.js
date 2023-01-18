const RecipeTile = (props) => {
    return (
        <div className="recipe-tile">
            <img src={props.image} alt="placeholder" width={256} height={256}/>
            <h2 className="mt-3">{props.title}</h2>
            <p>by {props.author.toUpperCase()}</p>
        </div>
    )
}

export default RecipeTile;