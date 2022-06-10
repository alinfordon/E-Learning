import { Button, Switch, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UploadForm = () => {
    const [fileData, setFileData] = useState({});
    const [imagin, setImagin] = useState();

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);        
      }

      const handleUpload = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', fileData)        
        
        const dataUp = await fetch("/api/single", {
            method: "POST",
            body: data,
        }).then(response => {
            return response.json(); 
        }).catch((err) => {
            console.log(err.message);
        })
        setImagin(dataUp) 
        console.log("data/" + imagin.filename)
      };

    return (
        <div className="container pt-3">
            <form onSubmit={handleUpload} >
                <div className="form-group">
                    <input type="file" className="form-control-file"  onChange={fileChangeHandler} name="image" />                    
                    <button type="submit" > Send  </button>

                </div>
            </form>
            <pre>{JSON.stringify(fileData, null, 4)}</pre>
        </div>
    )
};



export default UploadForm;

