import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [quizzes, setQuizzes] = useState({});
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;
  // for lessons
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState({    
    isVideo: false,
    isPlain: false,
    isQuizz: false, 
    uploadButtonText: "Upload Data",   
  });
  const [values, setValues] = useState({
    title: "",
    content: "",    
    video_link: "",
    data_link: "",
    quizz: "",
    upload_data: {},
  });
  const [uploading, setUploading] = useState(false);  
  const [uploadButtonText, setUploadButtonText] = useState("Upload Data");
  const [progress, setProgress] = useState(0);
  // student count
  const [students, setStudents] = useState(0);
  const [instructor, setInstructor] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  const myLoader = ({ src, width, quality }) => {
    return `${API_UP}/${src}?w=${width}&q=${quality || 75}`
  }


  useEffect(() => {
    loadCourse();    
  }, [slug]);

  useEffect(() => {    
    loadQuizzes();
  }, []);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);    
  };

  const loadQuizzes = async () => {
    const { data } = await axios.get("/api/instructor-quizzes");
    setQuizzes(data);
  }; 
 
  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, { 
      courseId: course._id,
    });    
    setStudents(data.length);
  };

  console.log(students)

  // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      // console.log(data)
      setValues({ ...values, title: "", content: "", video_link: "", data_link: "", quizz: "", upload_data: {} });
      setProgress(0);
      setStatus({ ...status, uploadButtonText: "Upload Data"});
      setVisible(false);
      loadCourse();
      toast("Lesson added");
    } catch (err) {
      console.log(err);
      toast("Lesson add failed");
    }
  };

  const handleImage = (e) => {
    setValues({ ...values, photo: "" })
    let files = e.target.files[0];
    //setPreview(window.URL.createObjectURL(file));
    setStatus({ ...status, uploadButtonText: files.name});    
    // resize    
    Resizer.imageFileResizer(files, 720, 500, "JPEG", 100, 0, async (file) => {
      const data = new FormData();
      data.append('image', file);  
      console.log(file)
      const dataUp = await fetch("/api/upload-data", {
          method: "POST",
          body: data,
      }).then(response => {
          return response.json(); 
      }).catch((err) => {
          console.log(err.message);
      })    
      console.log("data/", dataUp)    
      setValues({ ...values, data_link: dataUp.filePath, upload_data: dataUp });
    });
  };

  const handleUpload = async (e) => {
    setValues({ ...values, photo: "" })
    let file = e.target.files[0];
    //setPreview(window.URL.createObjectURL(file));
    //setUploadButtonText(file.name);
    setStatus({ ...status, uploadButtonText: file.name});
    const resizeFile = (file) => new Promise(resolve => {
      Resizer.imageFileResizer(file, 1024, 720, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      }, 'file' );
  });
    const image = await resizeFile(file);
    const data = new FormData();
    data.append('image', image);  
    //console.log(image)  
    
    const dataUp = await fetch("/api/upload-data", {
        method: "POST",
        body: data,
    }).then(response => {
        return response.json(); 
    }).catch((err) => {
        console.log(err.message);
    })    
    //console.log("data/", dataUp)    
    setValues({ ...values, data_link: dataUp.filePath, upload_data: dataUp });
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publsih your course, it will be live in the marketplace for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Congrats! Your course is live");
    } catch (err) {
      toast("Course publish failed. Try again");
    }
  };

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you unpublsih your course, it will no be available for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Your course is unpublished");
    } catch (err) {
      toast("Course publish failed. Try again");
    }
  };

  return (
    <InstructorRoute>
      <div className="contianer-fluid pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.photo ? 
                <Image
                  loader={myLoader}
                  src={course.photo}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit='cover' 
                /> : "/course.png"} 
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>

                  <div className="d-flex pt-4">
                    <Tooltip title={`${students} Enrolled`}>
                      <UserSwitchOutlined className="h5 pointer text-info mr-4" />
                    </Tooltip>

                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() =>
                          router.push(`/instructor/course/edit/${slug}`)
                        }
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>

                    {course.lessons && course.lessons.length < 1 ? (
                      <Tooltip title="Min 1 lessons required to publish">
                        <QuestionOutlined className="h5 pointer text-danger" />
                      </Tooltip>
                    ) : course.published ? (
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          onClick={(e) => handleUnpublish(e, course._id)}
                          className="h5 pointer text-danger"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={(e) => handlePublish(e, course._id)}
                          className="h5 pointer text-success"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <ReactMarkdown source={course.description} />
              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
            </div>

            <br />

            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                setValues={setValues}
                quizzes={quizzes}
                setQuizzes={setQuizzes}
                status={status}
                setStatus={setStatus}
                handleAddLesson={handleAddLesson}
                handleUpload={handleUpload}                
                uploading={uploading}
                uploadButtonText={uploadButtonText}                
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove} 
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
