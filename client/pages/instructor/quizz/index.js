import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import swal from "sweetalert";

const QuizIndex = () => {
  const [quizzs, setQuizzes] = useState([]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    const { data } = await axios.get("/api/instructor-all-quizzes");
    setQuizzes(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  const handleDelete = async (slug) => {    
    const willDelete = await swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: ["Cancel", true],
        dangerMode: true,
      })
      if (willDelete) {
        try {             
          const { data } = await axios.delete(`/api/quizz/${slug}`);
          console.log("Quizz DELETED =>", data);
          loadQuizzes();   
        } catch (err) {
          console.log(data.err)
        }       
      }
    };

 

  return (
    <InstructorRoute>
      <h1 className="text-center text-primary">Quizz Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

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
                    <Link
                      href={`/instructor/quizz/view/${quizz.slug}`}
                      className="pointer"
                    >
                      <Tooltip title="Edit ?">
                     <EditOutlined                      
                      className="text-info h5 pointer ml-4"
                    />
                    </Tooltip>
                    </Link>                    
                    <Tooltip title="Delete ?">
                     <DeleteOutlined
                      onClick={() => handleDelete(quizz.slug)}
                      className="text-danger h5 pointer ml-4"
                    />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default QuizIndex;
