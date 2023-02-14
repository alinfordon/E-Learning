import { Button, Progress, Tooltip } from "antd";
import React, { useState, useEffect } from "react";

const QuizzQuestionForm = ({
    values,
    setValues,    
    handleAddQuestion, 
  }) => {
     console.log(values)
    return(
        <div className="container pt-3">
          {values &&
          <form onSubmit={handleAddQuestion}>
          <label>Question</label>
            <input
              type="text"
              className="form-control square"              
              value={values.question}
              placeholder="Question"
              autoFocus
              onChange={(e) => setValues({ ...values, question: e.target.value })}
              required
            />  
            <div className="form-group pt-3">
              <label>Positive feedback</label>
                <input
                  type="text"
                  className="form-control square"              
                  value={values.feedbackp}
                  placeholder="Positive feedback"              
                  onChange={(e) => setValues({ ...values, feedbackp: e.target.value })}
                />  
            </div>   
            <div className="form-group ">
              <label>Negative feedback</label>
                <input
                  type="text"
                  className="form-control square"              
                  value={values.feedbackn}
                  placeholder="Negative feedback "              
                  onChange={(e) => setValues({ ...values, feedbackn: e.target.value })}
                />  
            </div>   
           <div className="form-group ">
           <label>Points for question</label>
            <input
              type="number"
              className="form-control square"              
              value={values.points}
              placeholder="Points"              
              onChange={(e) => setValues({ ...values, points: e.target.value })}
              required
            />  
            </div>
          
          <Button
              onClick={handleAddQuestion}
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

export default QuizzQuestionForm;

