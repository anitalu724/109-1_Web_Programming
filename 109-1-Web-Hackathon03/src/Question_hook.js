import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const next = async () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    if (current_question < contents.length - 1) {
      setCurrentQuestion(current_question + 1);
      setAns([...ans, 0]);
    }
    else { 
      const { data: { message, score } } = await instance.post('/checkAns', { params: { ans } });
      setScore(score);
      setComplete(true);
      console.log("my_total_score = ", score);
    }
  }

  const choose = (event) => {
    // TODO : update 'ans' for the option you clicked
    let index = parseInt(event.target.value);
    if (!Number.isNaN(index)) { 
      ans[current_question] = index;
      setAns([...ans]);
      console.log(ans);
    }
  }

  const getQuestions = async () => {
    // TODO : get questions from backend
    const { data: { message, contents } } = await instance.get('/getContents')
    setContents(contents);
  }


  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {current_question+1} of {contents.length}
            </div>
          </div>

          <div id="question-title">
            {complete ? <React.Fragment>Your Score : {score}/{contents.length}</React.Fragment>:<React.Fragment>{contents[current_question].question}</React.Fragment>}
          </div>

          {complete ?
            <div></div> :
            <div id="options">
              {contents[current_question].options.map((option, i) => 
                <div className="each-option" key={i} id={`div${current_question + 1}_${i + 1}`} onClick={choose}>
                  <input type="radio" id={`q${current_question + 1}_${i + 1}`} value={i + 1} checked={i+1 === ans[current_question]} readOnly/>
                  <span>{option}</span>
                </div>
              )}
            </div>
          }
          
          {complete ?
            <div></div> :
            <div id="actions" onClick={next}>
              NEXT
            </div>
          }
          
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
