import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import UploadForm from "../../../components/forms/UploadForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import user from "../../../../server/models/user";

const ModuleCreate = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "", 
    language: "",
    photo: "",
    uploading: false,
    paid: false,
    category: "",
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  // router
  const router = useRouter();
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;

  useEffect(() => {
    setValues({ ...values, language: router.locale.toString() })
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);         
  }

  const handleUpload = async (e) => {
    setValues({ ...values, photo: "" })
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    
    const data = new FormData();
    data.append('image', file);  
        
    
    const dataUp = await fetch("/api/upload-photo", {
        method: "POST",
        body: data,
    }).then(response => {
        return response.json(); 
    }).catch((err) => {
        console.log(err.message);
    })
    setImage(dataUp) 
    console.log("data/", dataUp)
    console.log("image/", image)
    setValues({ ...values, photo: dataUp.filePath });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    console.log(file)
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/stats", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.post("/api/category", {
        ...values,
        image,
      });
      toast("Great! Now you can start adding lessons");
      router.push("/instructor/course/create");
    } catch (err) {
      toast(err.response.data);
    }
  };

  return (
    <InstructorRoute>
      <h1 className="text-center text-primary">Create Module</h1>
      <div className="pt-3 pb-3">        
        <CourseCreateForm
          router={router}
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          handleUpload={handleUpload}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
          fileChangeHandler={fileChangeHandler}
        />
      </div>  
    </InstructorRoute>
  );
};

export default ModuleCreate;

/*
 <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre>
*/