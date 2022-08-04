import './index.css'

const AboutQuestionItem = props => {
  const {details} = props
  const {question, answer} = details
  return (
    <li className="QuestionContainer">
      <h1 className="questionItem">{question}</h1>
      <p className="answerItem">{answer}</p>
    </li>
  )
}

export default AboutQuestionItem
