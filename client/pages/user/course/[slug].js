import React, { useState, useEffect, createElement, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import StudentNav from "../../../components/nav/StudentNav";
import { Layout, Button, Menu, Avatar, Alert } from "antd";
import ReactPlayer from "react-player";
import YouTube from 'react-youtube';
import ReactMarkdown from "react-markdown";
import TopNav from "../../../components/TopNav";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  SyncOutlined,
} from "@ant-design/icons";


const { Item } = Menu;
const { Content, Footer, Header, Sider } = Layout;

const SingleCourse = () => { 
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [isQuizz, setIsQuizz] = useState(false);
  const [addQuizz, setAddQuizz] = useState(false);
  const [isExam, setIsExam] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [quizz, setQuizz] = useState({});
  const [exam, setExam] = useState({});
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  const [buttonName, setButtonName] = useState("Start")
  // force state update
  const [updateState, setUpdateState] = useState(false);
  const nodeRef = useRef(null);

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

  useEffect(() => {
    if (addQuizz) loadQuizzLesson();    
  }, [addQuizz]);

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
    const { data } = await axios.put(`/api/quizzForLesson`, {
      quizzId: course.lessons[clicked].quizz,
    });
    setQuizz(data[0]);    
    setIsQuizz(true);    
  }

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });    
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

  const resetQuizz = () =>{    
    setIsQuizz(false);
    setIsExam(false);
    setQuizz({});
  }

  const getTotal = () => {    
    let arr = quizz.questions;
    return arr && arr.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.grade;
  }, 0);    
};

  const checkAnswer = (a, index) => {
    let arr = quizz.questions;
    const current = arr.find((el) => el._id === a._id);
    current.isCheck = true;
    let arr1 = current.answers;
    arr1.forEach((c) => c.chekd = false);
    arr1[index].chekd = true;
    if(arr1[index].correct){
      current.grade = current.points;
      console.log(arr)
    }else{
      current.grade = 0;
    }
      
    setQuizz({ ...quizz, questions: arr });
    console.log("ANSWER", current);
  }

  const createExam = async () => {
    try{
      const { data } = await axios.post(`/api/exam`, {
        instructor: quizz.instructor._id,
        grade: getTotal(),
        title: quizz.title,
        questions: quizz.questions,
      });    
      resetQuizz();
      setIsExam(true);
      setExam(data);
      console.log(data);
    }catch (err) {
      console.log(err);
    }
  }
  
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const nextButton = () => {
    if(clicked + 1 === course.lessons.length){
      setButtonName("End");
      setIsEnd(true);
      setClicked(-1)
      return;
    }else{
      if (course.lessons[clicked + 1] && course.lessons[clicked + 1].quizz) setAddQuizz(true);
      if (course.lessons[clicked + 1] && !course.lessons[clicked + 1].quizz) setAddQuizz(false);
      setButtonName("Next");
      setClicked(clicked + 1);      
      resetQuizz();
    }   
  }
 // if (course.lessons[clicked] && course.lessons[clicked].quizz) loadQuizzLesson();

  //console.log(addQuizz, course.lessons[clicked])
  return (
    <StudentRoute nodeRef={nodeRef}>   
      <div className="student text-center ">
      <img src="/images/LOGO.png" className="white-logo" width={180} alt="logo" /> 
      <h1 className="text-light">{clicked === -1 ? course.name : course.lessons[clicked].title.substring(0, 200)}</h1>
      <img src="/images/eu_logo_right.png" className="white-logo" width={200} alt="logo" /> 
      </div> 
        <div className="culumn " style={{ minHeight: '70vh' }} >          
          <div className="container-fluid " style={{ minHeight: '65vh', position: 'relative', zIndex: 1 }}>
          {clicked !== -1 ? (
            <>
              {course.lessons[clicked] &&
                course.lessons[clicked].upload_data && (
                  <>
                    <div className="wrapper text-center mt-2">                   
                    <img
                    src={`${API_UP}/${course.lessons[clicked].data_link}`}
                    width="70%"
                    height="250px"
                    frameBorder="0"
                    
                  />               
                    </div>
                  </>
                )}
               {course.lessons[clicked] &&
                course.lessons[clicked].video_link && (
                  <>
                  <div className="container col-md-6 mt-4">
                    <div className="wrapper">                   
                    <YouTube videoId={course.lessons[clicked].video_link.split("=", 2)[1]} opts={opts} onReady={onReady} />                     
                    </div>
                  </div>
                  </>
                )}
               

              {!isQuizz && !isExam && 
                <div className="container">
                  <div className="row d-flex justify-content-center">
                    <ReactMarkdown
                    source={course.lessons[clicked].content}
                    className="single-post mt-4 "
                    />
                  </div>
              </div>
              }
                
                {course.lessons[clicked] && course.lessons[clicked].quizz &&
                  <div className="mt-4">
                    {!isQuizz && !isExam && <> 
                      <SyncOutlined
                        spin
                        className="d-flex justify-content-center display-1 text-primary p-5"
                      />                   
                     </>}           
                    {isQuizz && <>
                      <hr/>
                      <h3 className="text-primary">{quizz.title}</h3>
                      <ReactMarkdown
                        children={quizz.description}
                        className="single-post"
                      />
                      <hr/>
                      {quizz && quizz.questions && quizz.questions.map((q) => (
                        <div key={q._id}>
                        <ReactMarkdown source={q.question} className="single-post mt-4 py-2" />
                       <div className="mb-4 text-center">                        
                        { q.answers.map((a, index)=>(
                             <div
                             key={index}
                             onClick={() => checkAnswer(q, index)}
                             className={a.chekd ? "col-md-8 mt-4 button-q pressed text-left" : "col-md-8 mt-4 button-q text-left"}
                             //size="large"
                             //type={a.chekd ? "warning" : "primary"}                      
                             //shape="round"
                             
                           >
                             {index + 1 + ")  "}{a.answer}
                           </div>
                        ))}
                        </div>
                        </div>
                      ))}
                    </>}   
                    <div className="row">
                    <div className="col p-4">
                    {isExam && <div className="container">
                      <hr/>
                      <h3 className="text-primary">Feedback</h3>   
                      <hr />                   
                      {exam && exam.questions && exam.questions.map((q) => (
                        <div key={q._id}>
                        <h3>Question</h3>
                        <ReactMarkdown source={q.question} className="single-post mt-4 py-2" />                        
                        <hr />
                       <div className="mb-4">
                       <h3>Answers</h3>                        
                        { q.answers.map((a, index)=>(
                             <div
                             key={index}                             
                             //className={a.correct ? "mt-4 alert-q" : "mt-4 alert-q alert-incorrect "} 
                            
                           >                            
                             <p>{index + 1 + ")"} <span className={a.correct ? "text-success" : "text-danger"}>{a.answer}</span></p> 
                            
                             {a.feedback && <p className="py-2 text-info">Feedback {index + 1 + ") -"}  {a.feedback && a.feedback}</p>}                           
                           </div>
                        ))}                        
                        <hr/>
                        </div>
                        {q.feedbackp || q.feedbackn && <h3>Feedback</h3>}
                        {q.feedbackp && <h5 className="py-2 alert-q">{q.feedbackp && q.feedbackp}</h5>}
                        {q.feedbackn && <h5 className="py-2 alert-q alert-incorrect">{q.feedbackn && q.feedbackn}</h5>}
                        
                        <hr />
                        </div>
                      ))}                       
                    </div>}    
                    </div>
                    </div>  
                  </div>                                 
                }      
                         
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              {isEnd ? 
              <div>
              <img src="/images/end.png" className="white-logo" width={800} alt="logo" /> 
              </div>:
              <div className="text-center p-5">
                <div className="wrapper">
                <img src="/images/LOGO.png" className="white-logo" width={400} alt="logo" /> 
                </div>
              <br/>
                <p className="lead pointer" onClick={nextButton}>Click to start learning</p>                
              </div>
              }
            </div>
          )}
          
        </div>
        <div className="col-md-2 section-menu-module">
            <div className="" >            
              {course.lessons[clicked] && course.lessons[clicked].quizz ? 
                (isExam ? 
                  <p className="button-q"  onClick={isEnd ? router.push("/user") : nextButton}>{buttonName}</p> 
                  : 
                  <button className="button-q" disabled={!isQuizz} onClick={createExam}> Save </button>) 
                  : 
                <div>
                  {!isEnd && clicked !== -1 && <p className="button-q mr-2" onClick={(e) => setClicked(clicked - 1)}> Back </p>}
                  <p className="button-q"  onClick={isEnd ? () => router.push("/user") : nextButton}>{buttonName}</p>                  
                </div> 
              }              
            </div>
          </div>
        </div>   
        
    </StudentRoute>
  );
};

export default SingleCourse;
//<pre>{JSON.stringify(course.lessons[clicked], null, 4)}</pre> <StudentNav clicked={clicked} setClicked={setClicked} course={course} completedLessons={completedLessons} />
/*
<button className="button-q float-right" onClick={(e) => setClicked(clicked - 1)}> Back </button>
<ReactPlayer url='https://player.vimeo.com/video/759402145?h=bf08f58a1e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479' />
<Menu theme="light" defaultSelectedKeys={[clicked]} mode="inline" >
                {course.lessons.map((lesson, index) => (
                        <Item
                            onClick={() => (setClicked(index), resetQuizz())}
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

            <div className="col alert alert-primary square">
                <b>{course.lessons[clicked].title.substring(0, 200)}</b>
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

                 {course.lessons[clicked] &&
                course.lessons[clicked].video_link && (
                  <>
                    <div className="wrapper">                   
                    <YouTube videoId={course.lessons[clicked].video_link.split("=", 2)[1]} opts={opts} onReady={onReady} />                     
                    </div>
                  </>
                )}

                <div className="col-md-5">
                    {isExam && <>
                      <hr/>
                      <h3 className="text-primary">Your answers<span className="float-right text-success">You got {exam.grade} points</span></h3>  
                      <hr/>                    
                      {exam && exam.questions && exam.questions.map((q) => (
                        <>
                        <h5 className="py-2" key={q._id}>{q.question}</h5>
                       <div className="mb-4 ">                        
                        { q.answers.map((a, index)=>(
                             <div
                             key={index}                             
                             className={a.chekd && a.correct ? "mt-4 alert-q" : a.chekd && !a.correct ? "mt-4 alert-q alert-sel-incorrect" : "mt-4 alert-q alert-sel-correct"}
                             
                           >
                             {a.answer}
                           </div>
                        ))}                        
                        <hr/>
                        </div>
                        </>
                      ))}                       
                    </>}    
                    </div> 
*/