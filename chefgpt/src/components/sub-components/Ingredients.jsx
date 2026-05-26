
import React from "react"

import CallAIButton from "./CallAIButton.jsx"
import RecipeFromAI from "./RecipeFromAI.jsx"

import { getRecipeFromMistral } from "../../../ai.js"

export default function Ingredients({ ingredients }) {
    
    
    const ingredientItems = ingredients.map((item, index)=>(
        <li key={index}>{item}</li>
    ))
    
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    
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

    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
    async function getRecipe() {
        setLoading(true) // 🔥 start loading

        const recipe = await getRecipeFromMistral(ingredients)

        setRecipe(recipe)
        setRecipeShown(true)

        setLoading(false) // 🔥 stop loading
    }
    return (
        <section className="ingredients-section">
                
            <h2>Ingredients on hand:</h2>

            <ul className="ingredients-list" aria-live="polite">
                {ingredientItems}
            </ul>

            {ingredients.length > 3 && <CallAIButton getRecipe={getRecipe} loading={loading}/>}
            
            {recipe && <RecipeFromAI recipe={recipe} />}
                
        </section>
    )
}