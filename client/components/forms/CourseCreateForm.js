import { Select, Button, Avatar, Badge } from "antd";
import Image from 'next/image';
import FileBase64 from 'react-file-base64';
import UploadForm from "./UploadForm";

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  fileChangeHandler,
  handleUpload,
  values,
  setValues,
  router,
  preview,
  uploadButtonText,
  handleImageRemove = (f) => f,
  editPage = false,
}) => {
  console.log(values)
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;
  const myLoader = ({ src, width, quality }) => {
    return `${API_UP}/${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <>
      {values && (
        <form onSubmit={handleSubmit} className="container">
          <div className="form-group">
          <label>Title</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Title"
              value={values.name}
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
          <label>Module</label>            
            <Select
                  style={{ width: "100%" }}
                  size="large"
                  defaultValue="Module 1"   
                  name="category"  
                  onChange={(value) => setValues({ ...values, category: value })}
                >           
                <Option value="Module 1" name="category" className="nav-item text-dark">
                        Module 1
                </Option>      
                <Option value="Module 2" name="category" className="nav-item text-dark">
                        Module 2
                </Option>
            </Select>
          </div>

          <div className="form-group">
          <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              cols="7"
              rows="7"
              value={values.description}
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group">
              <label>Select Language</label>
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  defaultValue={router.locale.toString()}                  
                  onChange={(v) => setValues({ ...values, language: v })}
                >
                  {router.locales.map((locale) => (
                    <Option value={locale} className="nav-item text-dark" key={locale}>
                        {locale}
                    </Option>
                  ))} 
                </Select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <div className="form-group">              
              <label className="btn btn-dark btn-block text-left mt-3" >
              {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleUpload}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
            {preview && (
              <Badge count="X" onClick={() => setValues({ ...values, photo: "" })} className="pointer">
                <Avatar width={200} src={preview} />
              </Badge>
            )}

            {editPage && values.photo && (
              <Badge count="X" onClick={() => setValues({ ...values, photo: "" })} className="pointer">
                <Avatar width={200} src={<Image
                  loader={myLoader}
                  src={values.photo}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit='cover' 
                />} />
              </Badge>
            )}
            </div>

          <hr />
          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary"
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
          
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;
//<pre>{JSON.stringify(values, null, 4)}</pre>