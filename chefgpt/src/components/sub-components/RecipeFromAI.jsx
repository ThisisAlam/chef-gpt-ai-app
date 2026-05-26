import ReactMarkdown from 'react-markdown'


export default function RecipeFromAI({recipe}){
  return(
    <section className="recipe-from-AI">
      <ReactMarkdown>
        {recipe}
      </ReactMarkdown>
    </section>
  )
}