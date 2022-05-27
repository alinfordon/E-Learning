import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert";

const CourseIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
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
          const { data } = await axios.delete(`/api/course/${slug}`);
          console.log("Course DELETED =>", data);
          loadCourses();   
        } catch (err) {
          console.log(data)
        }       
      }
    };

  return (
    <InstructorRoute>
      <h1 className="text-center text-primary">Course Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

      {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
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

                    {course.lessons.length < 5 ? (
                      <p style={myStyle} className="text-warning">
                        At least 5 lessons are required to publish a course
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
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
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
                      onClick={() => handleDelete(course.slug)}
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

export default CourseIndex;
