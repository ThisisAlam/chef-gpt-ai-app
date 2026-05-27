import ReactMarkdown from 'react-markdown'
import React from "react"
import OpenAI from "openai";

import CallAIButton from "./sub-components/CallAIButton.jsx"
import RecipeFromAI from "./sub-components/RecipeFromAI.jsx"

export default function MainContent() {
    const [ingredients, setIngredients] = React.useState(["chicken","cheese","eggs","milk","fish"])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
    // Getting data from Form Function
    function handleSubmit(formData){
        const newIngredient = formData.get("ingredient")
        addIngredient(newIngredient)
    }
    function addIngredient(item){
      setIngredients((prev)=>[...prev, item])
    }

    // Ingredients List
    const ingredientItems = ingredients.map((item, index)=>(
        <li key={index}>{item}</li>
    ))
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            // recipeSection.current.scrollIntoView({behavior: "smooth"})
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])

    
    async function getRecipe() {
        setLoading(true) // 🔥 start loading

        const recipe = await getRecipeFromMistral(ingredients)

        setRecipe(recipe)
        setRecipeShown(true)

        setLoading(false) // 🔥 stop loading
    }

    return (
        <section className="main-content">
            <form action={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    name="ingredient"
                    placeholder="e.g. oregano"
                    required
                />
                <button>Add ingredient</button>
            </form>
            <hr />
            <section className="ingredients-section">
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">
                    {ingredientItems}
                </ul>
                {
                    ingredients.length > 3 && 
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
                }
                {
                    recipe && 
                    <section className="recipe-from-AI">
                        <ReactMarkdown>
                            {recipe}
                        </ReactMarkdown>
                    </section>
                }
            </section>
            <Ingredients ingredients={ingredients} />
        </section>
    )
}