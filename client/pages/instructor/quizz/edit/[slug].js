import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";
import UpdateQuestionForm from "../../../../components/forms/UpdateQuestionForm";
import QuizzCreateForm from "../../../../components/forms/QuizzCreateForm";

const { Item } = List;

const QuizzEdit = () => {
  // state
  const [values, setValues] = useState({
    title: "",
    description: "",    
    questions: [],
  });  

  // state for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({}); 
  const [answer, setAnswer] = useState({});

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadQuizz();
  }, [slug]);

  const loadQuizz = async () => {
    const { data } = await axios.get(`/api/quizz/${slug}`);
    console.log("data", data);
    if (data) setValues(data);    
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.put(`/api/quizz/${slug}`, {
        ...values,        
      });
      toast("Quizz updated!");
      // router.push("/instructor");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    // console.log("ON DRAG => ", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ON DROP => ", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allQuestions = values.questions;

    let movingItem = allQuestions[movingItemIndex]; // clicked/dragged item to re-order
    allQuestions.splice(movingItemIndex, 1); // remove 1 item from the given index
    allQuestions.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, questions: [...allQuestions] });
    // save the new questions order in db
    const { data } = await axios.put(`/api/quizz/${slug}`, {
      ...values,      
    });   
    toast("Questions rearranged successfully");
  };

  const handleDelete = async (index) => {    
    const willDelete = await swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: ["Cancel", true],
        dangerMode: true,
      })
      if (willDelete) {
        try {  
          let allQuestions = values.questions;
          const removed = allQuestions.splice(index, 1);
          // console.log("removed", removed[0]._id);
          setValues({ ...values, questions: allQuestions });
          // send request to server
          const { data } = await axios.put(`/api/quizz/${slug}/${removed[0]._id}`);
          //console.log("Question DELETED =>", data);  
        } catch (err) {
          console.log(data.err)
        }       
      }
    };
 
  const handleUpdateQuestion = async (e) => {
    // console.log("handle update lesson");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/quizz/question/${slug}/${current._id}`,
      current
    );    
    setVisible(false);
    // update ui
    if (data.ok) {
      let arr = values.questions;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, questions: arr });
      toast("Question updated");
    }
  };

  return (
    <InstructorRoute>
      <h1 className="text-center text-primary">Update Quizz</h1>
      {/* {JSON.stringify(values)} */}
      <div className="pt-3 pb-3">
        <QuizzCreateForm
          handleSubmit={handleSubmit}         
          handleChange={handleChange}
          values={values}
          setValues={setValues}   
          answer={answer}       
          setAnswer={setAnswer}
          editPage={true}
        />
      </div>      
      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.questions && values.questions.length} Questions</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.questions}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta                 
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={<span className="qizz-title">{item.question}</span>}                  
                ></Item.Meta>

                <EditOutlined
                   onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                    setAnswer(item.answers);
                  }}
                  className="h5 text-info float-right mr-4"
                />
                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="h5 text-danger float-right"
                />
              </Item>
            )}
          ></List>
        </div>
      </div>

      <Modal
        title="Update question"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <UpdateQuestionForm
          current={current}
          setCurrent={setCurrent}         
          handleUpdateQuestion={handleUpdateQuestion}          
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>
    </InstructorRoute>
  );
};

export default QuizzEdit;
