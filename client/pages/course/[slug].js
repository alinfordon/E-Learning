import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Layout } from 'antd';
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import TopNav from "../../components/TopNav";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Disclaimer from "../../components/home/Disclaimer";

const { Content, Footer, Header } = Layout;



const SingleCourse = ({ course }) => {
  // state  
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  const { t } = useTranslation();
  // context
  const {
    state: { user },
  } = useContext(Context);
  

  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("CHECK ENROLLMENT", data);
    setEnrolled(data);
  };

  const router = useRouter();
  const { slug } = router.query;

  const handlePaidEnrollment = async () => {
    // console.log("handle paid enrollment");
    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed, try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e) => {
    // console.log("handle free enrollment");
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Enrollment failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Header style={{ padding: 0}}>
        <TopNav 
            becomeInstructor={t("home:become-instructor")} 
            onlineCourse={t("home:online-course")} 
            login={t("home:login")} 
            createCourse={t("home:create-course")} 
            logoutT={t("home:logout")}
            dashboard={t("home:dashboard")}
            instructorT={t("home:instructor")}
        />
      </Header>      
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />
      <Content style={{ padding: '0 50px'}}> 
      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      </Content>
      <div>
        <hr />
        <Disclaimer />
      </div>
    </Layout>
  );
};


export async function getServerSideProps({ query, locale }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}


export default SingleCourse;
