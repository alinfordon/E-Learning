import { Button, Progress, Tooltip } from "antd";
import React, { useState, useEffect } from "react";

const QuizzCreateForm = ({
    values,
    setValues,    
    handleSubmit, 
  }) => {
     console.log(values)
    return(
        <div className="container pt-3">
          {values &&
          <form onSubmit={handleSubmit}>
          <label>Quizz Title</label>
            <input
              type="text"
              className="form-control square"              
              value={values.title}
              placeholder="Title"
              autoFocus
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              required
            />       
           <div className="form-group pt-3">
           <label>Quizz Description</label>
              <textarea
                name="description"
                cols="7"
                rows="7"
                value={values.description}
                className="form-control"
                onChange={(e) => setValues({ ...values, description: e.target.value })}
              ></textarea>
            </div>
          
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
          }   
      </div>
    )
}

export default QuizzCreateForm;