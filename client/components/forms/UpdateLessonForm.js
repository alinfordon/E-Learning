import { Button, Progress, Switch, Select } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
  current,
  setCurrent,
  quizzes,
  handleUpdateLesson,
  handleUpload,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {

  console.log(current)

  return (
    <div className="container pt-3">
      {/* {JSON.stringify(current)} */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
        ></textarea>

       {current.video_link &&
        <div className="form-group mt-2">         
            <input
              type="text"
              name="vlink"
              className="form-control"
              placeholder="https://youtube.com/34feert"
              value={current.video_link}
              onChange={(e) => setCurrent({ ...current, video_link: e.target.value })}
            />
          </div>
        }
       
       {current.data_link &&
           <div className="form-row">
           <div className="col">
             <div className="form-group">              
             <label className="btn btn-dark btn-block text-left mt-3" >
             {current.upload_data ? current.upload_data.fileName : "Upload"}
                 <input
                   type="file"
                   name="image"
                   onChange={handleUpload}
                   accept="data/*"
                   hidden
                 />
               </label>
             </div>
           </div>          
           </div>
        }

        {current.quizz &&
          <div className="form-row mt-2">
          <div className="col">
            <div className="form-group">            
              <Select
                style={{ width: "100%" }}
                size="large"   
                defaultValue="Select Quizz"                               
                onChange={(v) => setCurrent({ ...current, quizz: v })}
              >
                {quizzes.map((q) => (
                  <Option value={q._id} className="nav-item text-dark" key={q._id}>
                      {q.title}
                  </Option>
                ))} 
              </Select>
            </div>
          </div>
        </div>
        }
        <Button
          onClick={handleUpdateLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
