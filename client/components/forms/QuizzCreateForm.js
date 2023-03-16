import { Button, Progress, Tooltip, Select, Switch } from "antd";
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
            <div className="d-flex justify-content-between">
            <span className="pt-3 badge ">Is HotSpot?</span>
              <Switch
                className="float-right mt-2"            
                checked={values.hotspot}
                name="isPlain"
                onChange={(v) => setValues({ ...values, hotspot: v })}
              />
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
          <pre>{JSON.stringify(values, null, 4)}</pre>
      </div>
    )
}

export default QuizzCreateForm;