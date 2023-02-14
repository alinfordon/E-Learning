import { Button, Switch, Tooltip } from "antd";
import React, { useState, useEffect } from "react";

const QuizzAnswerForm = ({
    answerData,
    setAnswerData,    
    handleAddAnswer, 
  }) => {
     //console.log(answerData)
    return(
        <div className="container pt-3">
          {answerData &&
          <form onSubmit={handleAddAnswer}>
          <label>Answer</label>
            <input
              type="text"
              className="form-control square"              
              value={answerData.answer}
              placeholder="Answer"
              autoFocus
              onChange={(e) => setAnswerData({ ...answerData, answer: e.target.value })}
              required
            />       
           <div className="d-flex justify-content-between">
          <span className="pt-3 badge h5">Is Correct?</span>
          <Switch
            className="float-right mt-2"            
            checked={answerData.correct}
            name="fee_preview"
            onChange={(v) => setAnswerData({ ...answerData, correct: v })}
          />
        </div>
        <label>Feedback</label>
            <input
              type="text"
              className="form-control square"              
              value={answerData.feedback}
              placeholder="Feedback"              
              onChange={(e) => setAnswerData({ ...answerData, feedback: e.target.value })}              
            />  
          
          <Button
              onClick={handleAddAnswer}
              className="col mt-3"
              size="large"
              type="primary"            
              shape="round"
            >
              Save
          </Button>
          </form>
          }   
      </div>
    )
}

//<pre>{JSON.stringify(values, null, 4)}</pre>

export default QuizzAnswerForm;

