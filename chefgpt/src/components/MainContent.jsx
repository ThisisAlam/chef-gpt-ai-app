
import React from "react"


import Form from "./sub-components/Form.jsx"
import Ingredients from "./sub-components/Ingredients.jsx"

export default function MainContent() {
    const [ingredients, setIngredients] = React.useState(["chicken","cheese","eggs","milk","fish"])
    
    function addIngredient(item){
      setIngredients((prev)=>[...prev, item])
    }

    return (
        <section className="main-content">
            <Form addIngredient = {addIngredient}/>
            <Ingredients ingredients={ingredients} />
        </section>
    )
}