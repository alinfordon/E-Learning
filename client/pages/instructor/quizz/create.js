import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import QuizzCreateForm from "../../../components/forms/QuizzCreateForm";


const CreateQuizz = () => {
    // state
    const [values, setValues] = useState({
        title: "",
        description: "",
        hotspot: false,        
    });
    // router
    const router = useRouter();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // console.log(values);
          const { data } = await axios.post("/api/quizz", {
            ...values
          });
          toast("Great! Now you can start adding quizz");
          router.push("/instructor/quizz");
        } catch (err) {
          toast(err.response.data);
        }
      };

    return (
        <InstructorRoute>
          <h1 className="text-center text-primary">Create Quizz</h1>
          <div className="pt-3 pb-3">
              <QuizzCreateForm
                  handleSubmit={handleSubmit}          
                  handleChange={handleChange}
                  values={values}
                  setValues={setValues} 
              />
          </div>   
        </InstructorRoute>
    )
}

export default CreateQuizz;