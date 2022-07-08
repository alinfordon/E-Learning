import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import YouTube from 'react-youtube';
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
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
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

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
      <div className="row">
        <div style={{ maxWidth: 420 }}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary mt-1 btn-block mb-2"
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
            {!collapsed && "Lessons"}
          </Button>
          <Menu
            theme="light"
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh" }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                onClick={() => setClicked(index)}
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
        </div>

        <div className="col">
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
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary display-1 p-5" />
                <p className="lead">Clcik on the lessons to start learning</p>
              </div>
            </div>
          )}
          <pre>{JSON.stringify(course.lessons[clicked], null, 4)}</pre>
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
