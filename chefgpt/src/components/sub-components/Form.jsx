
export default function Form(props) {
    
    function handleSubmit(formData){
        const newIngredient = formData.get("ingredient")
        props.addIngredient(newIngredient)
    }

    return (
        <>
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
        </>
    )
}
