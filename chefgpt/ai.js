import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_HF_API_KEY)

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe.
Use markdown formatting with headings, bullet lists, and steps.
`

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await hf.chatCompletion({
            model: "HuggingFaceH4/zephyr-7b-beta",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have these ingredients: ${ingredientsString}. Suggest a recipe with steps and ingredients.` }
            ],
            max_tokens: 300
        })

        return response.choices[0].message.content
    } catch (err) {
        console.error(err)
        return "Error generating recipe."
    }
}