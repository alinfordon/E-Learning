import { Button, Progress, Tooltip } from "antd";
import React, { useState, useEffect } from "react";

const QuizzCreateForm = ({
    values,
    setValues,
    handleSubmit,    
    fields,
  }) => {
      const fields = ['test'];
      console.log(fields)
      const [isQuestion, setIsQuestion] = useState(false);
      const [question, setQuestion] = useState();
      const [Aanswer, setAnswer] = useState();

    return(
        <div className="container pt-3">
        <form onSubmit={handleSubmit}>
        <label>Quizz Title</label>
          <input
            type="text"
            className="form-control square"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
            placeholder="Title"
            autoFocus
            required
          />        
        <Button
            onClick={() => setIsQuestion(true)}
            className="col-md-3 mt-3 float-right"
            size="large"
            type="primary"            
            shape="round"
          >
            Add Question
        </Button>
        {isQuestion && 
            <div>
                <input
                type="text"
                className="form-control square"
                onChange={(e) => setValues({ ...values, question: e.target.value })}
                value={values.question}
                placeholder="Your Question"
                autoFocus
                required
            /> 
            </div>
        }
        <Button
            onClick={handleSubmit}
            className="col mt-3"
            size="large"
            type="primary"            
            shape="round"
          >
            Save
        </Button>
        </form>
        <pre>{JSON.stringify(fields, null, 4)}</pre>
      </div>
    )
}

export default QuizzCreateForm;