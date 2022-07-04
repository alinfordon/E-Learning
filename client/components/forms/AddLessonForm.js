import { Button, Progress, Tooltip, Switch, Select } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddLessonForm = ({
  values,
  setValues,
  quizzes,
  setQuizzes,
  status,
  setStatus,
  handleAddLesson,
  uploading,  
  handleUpload,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          autoFocus
          required
        />

        <textarea
          className="form-control mt-3"
          cols="7"
          rows="4"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
        ></textarea>      
       <hr />
        <div className="d-flex justify-content-between">
          <span className="pt-3 badge ">{status.isVideo ? "Video Link: " : "Video Lesson ?"}</span>
          <Switch
            className="float-right mt-2"            
            checked={status.isVideo}
            name="isVideo"
            onChange={(v) => {setStatus({ ...status, isVideo: v }), setValues({ ...values, video_link: "" })}}
          />
        </div>
        {status.isVideo &&
        <div className="form-group mt-2">         
            <input
              type="text"
              name="vlink"
              className="form-control"
              placeholder="https://youtube.com/34feert"
              value={values.video_link}
              onChange={(e) => setValues({ ...values, video_link: e.target.value })}
            />
          </div>
        }
        <div className="d-flex justify-content-between">
          <span className="pt-3 badge ">{status.isPlain ? "Upload Lessson: " : "Plain Lesson ?"}</span>
          <Switch
            className="float-right mt-2"            
            checked={status.isPlain}
            name="isPlain"
            onChange={(v) => {setStatus({ ...status, isPlain: v, uploadButtonText: "Upload Data", }), setValues({ ...values, data_link: "", upload_data: {} })}}
          />
        </div>
        {status.isPlain &&
           <div className="form-row">
           <div className="col">
             <div className="form-group">              
             <label className="btn btn-dark btn-block text-left mt-3" >
             {status.uploadButtonText}
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
        <div className="d-flex justify-content-between bg-light">
          <span className="pt-3 badge ">{status.isQuizz ? "Select quizz: " : "Quizz for lesson?"}</span>
          <Switch
            className="float-right mt-2"            
            checked={status.isQuizz}
            name="isQuizz"
            onChange={(v) => {setStatus({ ...status, isQuizz: v }), setValues({ ...values, quizz: "" })}}
          />
        </div>
        {status.isQuizz &&
          <div className="form-row mt-2">
          <div className="col">
            <div className="form-group">            
              <Select
                style={{ width: "100%" }}
                size="large"   
                defaultValue="Select Quizz"                               
                onChange={(v) => setValues({ ...values, quizz: v })}
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
          onClick={handleAddLesson}
          className="col mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
          Save
        </Button>
      </form>
      <pre>{JSON.stringify(quizzes, null, 4)}</pre>
    </div>
  );
};

export default AddLessonForm;

/*
 <div className="d-flex justify-content-center">
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>

          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>

        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
         <pre>{JSON.stringify(values, null, 4)}</pre>
*/