import { Button, Progress, Tooltip, Switch } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

const AddLessonForm = ({
  values,
  setValues,
  status,
  setStatus,
  handleAddLesson,
  uploading,
  uploadButtonText,
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
            onChange={(v) => setStatus({ ...status, isVideo: v })}
          />
        </div>
        {status.isVideo &&
        <div className="form-group mt-2">         
            <input
              type="text"
              name="vlink"
              className="form-control"
              placeholder="https://youtube.com/34feert"
              value={values.vlink}
              onChange={(e) => setValues({ ...values, vlink: e.target.value })}
            />
          </div>
        }
        <div className="d-flex justify-content-between bg-light">
          <span className="pt-3 badge ">Plain Lesson?</span>
          <Switch
            className="float-right mt-2"            
            checked={status.isPlain}
            name="isPlain"
            onChange={(v) => setStatus({ ...status, isPlain: v })}
          />
        </div>
        <div className="d-flex justify-content-between bg-light">
          <span className="pt-3 badge ">Quizz?</span>
          <Switch
            className="float-right mt-2"            
            checked={status.isQuizz}
            name="isQuizz"
            onChange={(v) => setStatus({ ...status, isQuizz: v })}
          />
        </div>
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
      <pre>{JSON.stringify(values, null, 4)}</pre>
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
*/