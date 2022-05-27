import { Button, Progress, Tooltip } from "antd";
import React, { useState, useEffect } from "react";

const UpdateQuestionForm = ({
    current,
    setCurrent,    
    handleUpdateQuestion, 
  }) => {

    const handleChange = (e) => {
      setValues({ ...current, [e.target.name]: e.target.value });
    };

    return(
        <div className="container pt-3">
          {current &&
          <form onSubmit={handleUpdateQuestion}>
          <label>Question</label>
            <input
              type="text"
              className="form-control square"              
              value={current.question}
              placeholder="Question"
              autoFocus
              onChange={(e) => setCurrent({ ...current, question: e.target.value })}
              required
            />       
           <div className="form-group pt-3">
           <label>Points for question</label>
            <input
              type="number"
              className="form-control square"              
              value={current.points}
              placeholder="Points"              
              onChange={(e) => setCurrent({ ...current, points: e.target.value })}
              required
            />  
            </div>
            <div className="form-group pt-3">      
            <label>Answers</label>     
            {current.answers && current.answers.map((a) => (
                <input
                  type="text"
                  className="form-control alert alert-secondary"              
                  defaultValue={a.answer}                             
                  onChange={(e) => setCurrent({ ...current, a: e.target.value })}                  
                /> 
            ))}
            </div>
          
          <Button
              onClick={handleUpdateQuestion}
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

export default UpdateQuestionForm;

