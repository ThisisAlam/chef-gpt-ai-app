
export default function CallAIButton({getRecipe, loading}){
    return(
        <section className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>

            <button onClick={getRecipe}
                    className="get-recipe-btn" 
                    disabled={loading}>
                {loading ? "Generating..." : "Get a recipe"}
            </button>
        </section>
    )
}