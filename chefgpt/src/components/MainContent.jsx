import ReactMarkdown from 'react-markdown'
import React from "react"

import OpenAI from "openai";

import { checkEnvironment } from '../../utils.js';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_AI_KEY,
    baseURL: import.meta.env.VITE_AI_URL,
    dangerouslyAllowBrowser: true
})

export default function MainContent() {
    //Checking Environment
    checkEnvironment();
    // OpenAI Client
    // Adding Ingreditents
    const [ingredients, setIngredients] = React.useState(["chicken","cheese","eggs","milk","fish"])
    const [recipeShown, setRecipeShown] = React.useState(false)
    // Loading State
    const [loading, setLoading] = React.useState(false)
    // Markdown Recipe From AI
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)

    // Getting data from Form Function
    function handleSubmit(formData){
        const newIngredient = formData.get("ingredient")
        addIngredient(newIngredient)
    }
    function addIngredient(item){
      setIngredients((prev)=>[...prev, item])
    }
    
    // Getting data from Form Function
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
    
    async function getRecipe(e) {
        e.preventDefault();
        try{
            setLoading(true) // 🔥 start loading
            const stream = await openai.responses.create({
                model: import.meta.env.VITE_AI_MODEL,
                input: updatedMessages,
                tools: [{ type: "web_search_preview" }],
                stream: true
            })
            let fullResponse = ""
            setResponseOutput("")
            for await (const chunk of stream) {
                if (chunk.type === "response.output_text.delta") {
                fullResponse += chunk.delta
                setResponseOutput(fullResponse)
                }
            }
            setRecipe(recipe)
            setRecipeShown(true)
        } catch(error){
            if(error.status === 401 || error.status === 403){
                setResponseOutput("Authentication error: Check your AI-KEY and make sure it's Valid");
            } else if(error.status >= 500){
                setResponseOutput("AI provider error: Something went wrong on the provider side. Try again shortly.");
            } else {
                setResponseOutput(`Unexpected error: ${error.message || error}`);
            }

        } finally {
            setLoading(false) // 🔥 stop loading
            setInputPrompt("")
        }
    }

    // Ingredients List
    const ingredientItems = ingredients.map((item, index)=>(
        <li key={index}>{item}</li>
    ))

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