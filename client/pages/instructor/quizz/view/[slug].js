import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
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
import QuizzQuestionForm from "../../../../components/forms/QuizzQuestionForm";
import QuizzAnswerForm from "../../../../components/forms/QuizzAnswerForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const QuizzView = () => {
  const [quizz, setQuizz] = useState({});
  // for quizz
  const [visible, setVisible] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [values, setValues] = useState({
    question: "",    
    points: "",
  });
  const [answerData, setAnswerData] = useState({
    answer: "",    
    correct: false,
  });
 
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadQuizz();
  }, [slug]);

  console.log(quizz)

  const loadQuizz = async () => {
    const { data } = await axios.get(`/api/quizz/${slug}`);
    setQuizz(data);
  };

  // FUNCTIONS FOR ADD Question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post(
        `/api/quizz/question/${slug}/${quizz.instructor._id}`,
        values
      );
      // console.log(data)
      setValues({ ...values, question: "", points: "" });      
      setVisible(false);
      setQuizz(data);
      toast("Question added");
    } catch (err) {
      console.log(err);
      toast("Question add failed");
    }
  };

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.put(
        `/api/quizz/answer/${slug}/${quizz.instructor._id}`,
        answerData
      );
      // console.log(data)
      setAnswerData({ ...answerData, answer: "", correct: false });      
      setIsAnswer(false);
      loadQuizz();
      toast("Answer added");
    } catch (err) {
      console.log(err);
      toast("Answer add failed");
    }
  };

  const prepareAnswer = async ( questionId) => {
    setAnswerData({ ...answerData, _id: questionId});
    setIsAnswer(true);
    console.log(answerData)
  };
  
  const handlePublish = async (e, quizzId) => {
    try {
      let answer = window.confirm(
        "Once you publish your quizz, it will be live in the marketplace for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/publish-quizz/${quizzId}`);
      setQuizz(data);
      toast("Congrats! Your quizz is live");
    } catch (err) {
      toast("Quizz publish failed. Try again");
    }
  };

  const handleUnpublish = async (e, quizzId) => {
    try {
      let answer = window.confirm(
        "Once you unpublsih your quizz, it will no be available for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/unpublish-quizz/${quizzId}`);
      setQuizz(data);
      toast("Your quizz is unpublished");
    } catch (err) {
      toast("Quizz publish failed. Try again");
    }
  };

  return (
    <InstructorRoute>
      <div className="contianer-fluid pt-3">
        {/* <pre>{JSON.stringify(quizz, null, 4)}</pre> */}
        {quizz && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src="/images/quizz.png"
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{quizz.title}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {quizz.questions && quizz.questions.length} Questions
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {quizz.description}
                    </p>
                  </div>

                  <div className="d-flex pt-4">

                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() =>
                          router.push(`/instructor/quizz/edit/${slug}`)
                        }
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>

                    {quizz.questions && quizz.questions.length < 1 ? (
                      <Tooltip title="Min 1 questions required to publish">
                        <QuestionOutlined className="h5 pointer text-danger" />
                      </Tooltip>
                    ) : quizz.published ? (
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          onClick={(e) => handleUnpublish(e, quizz._id)}
                          className="h5 pointer text-danger"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={(e) => handlePublish(e, quizz._id)}
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
                
              </div>
            </div>
            <div className="row p-3">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Questions
              </Button>
            </div>

            <br />

            <Modal
              title="+ Add Question"              
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <QuizzQuestionForm
                values={values}
                setValues={setValues}
                handleAddQuestion={handleAddQuestion}
              />
            </Modal>
            <Modal
              title="+ Add Answer"
              centered
              visible={isAnswer}
              onCancel={() => setIsAnswer(false)}
              footer={null}
            >
              <QuizzAnswerForm
                answerData={answerData}
                setAnswerData={setAnswerData}
                handleAddAnswer={handleAddAnswer}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {quizz && quizz.questions && quizz.questions.length} Questions
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={quizz && quizz.questions}
                  renderItem={(item, index) => (
                    <Item key={index}>
                      <Item.Meta                        
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={<span className="qizz-title">{item.question}</span>}
                        description={<ul className="list-group">{item.answers && item.answers.map((a) => (
                          <li key={a.answer} className="float-left alert alert-secondary"><span className={a.correct ? "text-success" : "text-info"}>Raspuns:</span> {a.answer}</li>
                      ))}</ul>}
                      >                      
                      </Item.Meta>                      
                      <div></div>
                      <Button 
                        onClick={() => prepareAnswer(item._id)}
                        className="col-md-2 offset-md-3 text-center"
                        type="danger"
                        shape="round"
                        icon={<UploadOutlined />}
                        size="small">
                            Add Answer
                       </Button>
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

export default QuizzView;
