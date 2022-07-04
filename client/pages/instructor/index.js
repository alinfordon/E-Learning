import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  const [quizzs, setQuizzes] = useState([]);
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;

  useEffect(() => {
    loadCourses();
    loadQuizzes();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const loadQuizzes = async () => {
    const { data } = await axios.get("/api/instructor-quizzes");
    setQuizzes(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <h1 className="text-center text-primary mb-4">Instructor Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
      <div className="container p-50">
        <div className="row">
          <div className="col-md-6">
          <h4 className="text-left text-primary">Courses</h4>
          <hr />
            {courses &&
            courses.map((course) => (
            <>
              <div className="media pt-2">
                <Avatar
                  size={80}
                  src={course.photo ? `${API_UP}/${course.photo}` : "/course.png"}
                />

                <div className="media-body pl-2">
                  <div className="row">
                    <div className="col">
                      <Link
                        href={`/instructor/course/view/${course.slug}`}
                        className="pointer"
                      >
                        <a className="mt-2 text-primary">
                          <h5 className="pt-2">{course.name}</h5>
                        </a>
                      </Link>
                      <p style={{ marginTop: "-10px" }}>
                        {course.lessons.length} Lessons
                      </p>

                      {course.lessons.length < 1 ? (
                        <p style={myStyle} className="text-warning">
                          At least 1 lessons are required to publish a course
                        </p>
                      ) : course.published ? (
                        <p style={myStyle} className="text-success">
                          Your course is live in the marketplace
                        </p>
                      ) : (
                        <p style={myStyle} className="text-success">
                          Your course is ready to be published
                        </p>
                      )}
                    </div>

                    <div className="col-md-3 mt-3 text-center">
                      {course.published ? (
                        <Tooltip title="Published">
                          <CheckCircleOutlined className="h5 pointer text-success" />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unpublished">
                          <CloseCircleOutlined className="h5 pointer text-warning" />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          </div>
          <div className="col-md-6">
          <h4 className="text-left text-primary">Quizzs</h4>
          <hr />
          {quizzs &&
            quizzs.map((quizz) => (
              <>
                <div className="media pt-2">
                  <Avatar
                    size={80}
                    src="/images/quizz.png"
                  />

                  <div className="media-body pl-2">
                    <div className="row">
                      <div className="col">
                        <Link
                          href={`/instructor/quizz/view/${quizz.slug}`}
                          className="pointer"
                        >
                          <a className="mt-2 text-primary">
                            <h5 className="pt-2">{quizz.title}</h5>
                          </a>
                        </Link>
                        <p style={{ marginTop: "-10px" }}>
                          {quizz.questions.length} Questions
                        </p>

                        {quizz.questions.length < 1 ? (
                          <p style={myStyle} className="text-warning">
                            At least 1 questions are required to publish a quezz
                          </p>
                        ) : quizz.published ? (
                          <p style={myStyle} className="text-success">
                            Your quizz is live in the marketplace
                          </p>
                        ) : (
                          <p style={myStyle} className="text-success">
                            Your quizz is ready to be published
                          </p>
                        )}
                      </div>

                      <div className="col-md-3 mt-3 text-center">
                        {quizz.published ? (
                          <Tooltip title="Published">
                            <CheckCircleOutlined className="h5 pointer text-success" />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Unpublished">
                            <CloseCircleOutlined className="h5 pointer text-warning" />
                          </Tooltip>
                        )}  
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
     
    </InstructorRoute>
  );
};

export default InstructorIndex;
