import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import StudentNav from "../../../components/nav/StudentNav";
import { Layout, Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import YouTube from 'react-youtube';
import ReactMarkdown from "react-markdown";
import TopNav from "../../../components/TopNav";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";


const { Item } = Menu;
const { Content, Footer, Header, Sider } = Layout;

const SingleCourse = () => { 
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [isQuizz, setIsQuizz] = useState(false);
  const [quizz, setQuizz] = useState({});
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update
  const [updateState, setUpdateState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const opts = {
    height: '500px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const loadQuizzLesson = async () => {
    console.log(course.lessons[clicked].quizz)    
    const { data } = await axios.put(`/api/quizzForLesson`, {
      quizzId: course.lessons[clicked].quizz,
    });
    setQuizz(data[0]);    
    setIsQuizz(true);
    console.log(quizz)
  }

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log("COMPLETED LESSONS => ", data);
    setCompletedLessons(data);
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      console.log(data);
      const all = completedLessons;
      console.log("ALL => ", all);
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED => ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  //console.log(clicked && course.lessons[clicked])
  const linkToPPTFile =
  "https://rainboprojectlgbtqi.eu/public/data/1656665824872_Presentation.pptx";

  return (
    <StudentRoute>   
      <h1 className="jumbotron text-center ">
      {course.name}
      </h1> 
        <div className="row">
          <div className="col-md-3">
          <Menu theme="light" defaultSelectedKeys={[clicked]} mode="inline" >
                {course.lessons.map((lesson, index) => (
                        <Item
                            onClick={() => (setClicked(index), setIsQuizz(false))}
                            key={index}
                            icon={<Avatar>{index + 1}</Avatar>}
                        >
                            {lesson.title.substring(0, 30)}{" "}
                            {completedLessons.includes(lesson._id) ? (
                            <CheckCircleFilled
                                className="float-right text-primary ml-2"
                                style={{ marginTop: "13px" }}
                            />
                            ) : (
                            <MinusCircleFilled
                                className="float-right text-danger ml-2"
                                style={{ marginTop: "13px" }}
                            />
                            )}
                        </Item>
                    ))}   
            </Menu>
            <hr/>
          </div>
          <div className="col-md-9" style={{ minHeight: '100vh' }}>
          {clicked !== -1 ? (
            <>
              <div className="col alert alert-primary square">
                <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span
                    className="float-right pointer"
                    onClick={markIncompleted}
                  >
                    Mark as incomplete
                  </span>
                ) : (
                  <span className="float-right pointer" onClick={markCompleted}>
                    Mark as completed
                  </span>
                )}
              </div>

              {course.lessons[clicked] &&
                course.lessons[clicked].video_link && (
                  <>
                    <div className="wrapper">                   
                    <YouTube videoId={course.lessons[clicked].video_link.split("=", 2)[1]} opts={opts} onReady={onReady} />                     
                    </div>
                  </>
                )}

                {course.lessons[clicked] && course.lessons[clicked].upload_data && course.lessons[clicked].upload_data.fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                    <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=https://rainboprojectlgbtqi.eu/${course.lessons[clicked].data_link}`}
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="slides"
                  ></iframe>
                }
                 {course.lessons[clicked] && course.lessons[clicked].upload_data && course.lessons[clicked].upload_data.fileType === 'application/pdf' &&
                    <embed
                    style={{
                            width: '100%',
                      height: '100%',
                    }}
                    type='application/pdf'
                    src={`${API_UP}/${course.lessons[clicked].data_link}`}
                     />                                        
                }

              <ReactMarkdown
                source={course.lessons[clicked].content}
                className="single-post"
              />
                <hr/>
                {course.lessons[clicked] && course.lessons[clicked].quizz &&
                  <div className="col alert alert-primary square">
                    <b>{ isQuizz ? quizz.title : "This lesson have a Quizz"  }</b>
                    {isQuizz ? 
                    <span
                    className="float-right pointer"
                    onClick={()=>(setQuizz(" "), setIsQuizz(false))}
                  >
                     End Quizz
                  </span> : 
                    <span
                    className="float-right pointer"
                    onClick={loadQuizzLesson}
                  >
                     Start Quizz
                  </span>}
                  </div>                                 
                }       
                {isQuizz &&
                  <>
                    {quizz.description}
                  </>
                }         
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead">Click on the lessons to start learning</p>
              </div>
            </div>
          )}
          
        </div>
        </div>   
    </StudentRoute>
  );
};

export default SingleCourse;
//<pre>{JSON.stringify(course.lessons[clicked], null, 4)}</pre> <StudentNav clicked={clicked} setClicked={setClicked} course={course} completedLessons={completedLessons} />