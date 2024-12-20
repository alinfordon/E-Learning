import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import course from "../../../server/models/course";


export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["user"])),
    },
  };
}

const UserIndex = () => {
  const { t } = useTranslation();
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  
  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-5"
        />
      )}
      <h1 className="text-center text-primary">My courses</h1>

      {/* show list of courses */}

      {courses &&
        courses.map((course) => (
          <div key={course._id} className="media pt-2 pb-1">
            <Avatar
              size={80}
              shape="square"
              src={course.photo ? `${API_UP}/${course.photo}` : "/course.png"}
            />

            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <h5 className="mt-2 text-primary">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons.length} {t("user:lessons")}
                  </p>
                  <p
                    className="text-muted"
                    style={{ marginTop: "-15px", fontSize: "12px" }}
                  >
                   {course.description}
                  </p>
                </div>
                <div className="col-md-3 mt-3 text-center">
                  <Link href={`/user/course/${course.slug}`}>
                    <a>
                      <PlayCircleOutlined className="h2 pointer text-primary" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
