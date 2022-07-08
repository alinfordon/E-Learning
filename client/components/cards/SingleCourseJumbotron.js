import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import Image from 'next/image';

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}) => {
  // destructure
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    photo,
    language,
    price,
    paid,
    category,
  } = course;
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;

  const myLoader = ({ src, width, quality }) => {
    return `${API_UP}/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          {/* title */}
          <h1 className="text-light font-weight-bold mb-4">{name}</h1>          
          {/* description */}
          <p className="lead text-light">
            {description && description.substring(0, 160)}...
          </p>          
          {/* author */}
          <p className="lead text-light">Created by: {instructor.name}</p>
          {/* updated at */}
          <p className="text-light">Last udpated: {new Date(updatedAt).toLocaleDateString()}</p> 
          {/* category */}
          <Badge
            count={`Language: ${language}`}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mr-2"
          />        
        </div>
        <div className="col-md-4">
          {/* {JSON.stringify(lessons[0])} */}
          {/* show video preview or course image */}
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                light={image.Location}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <>
               <Image
                loader={myLoader}
                src={photo}
                alt="Picture of the author"
                layout="responsive"
                objectFit='cover'
                height={200}
                width={500}
                //style={{ height: "200px", objectFit: "cover" }}
                //className="p-1"
              />
            </>
          )}
          {/* enroll button */}
          {loading ? (
            <div className="d-flex justify-content-center mt-3">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="danger"
              block
              shape="round"
              icon={<SafetyOutlined />}
              size="large"
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? "Go to course"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
