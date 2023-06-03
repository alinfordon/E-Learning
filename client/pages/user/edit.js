import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import UpdateUserForm from "../../components/forms/UpdateUserForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar, Modal } from "antd";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Context } from "../../context";

const { Item } = List;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["user"])),
      },
    };
  }

const EditUser = () => {
  // state
  const { t } = useTranslation();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);     
  const [current, setCurrent] = useState({}); 
  

  // router
  const router = useRouter();
  const { pathname, asPath, query } = router

  useEffect(() => {
    loadUser(); 
  }, []);

  const loadUser = async () => {
    const { data } = await axios.get(`/api/update-user`);
    setCurrent(data && data);    
  };

  //console.log(current)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      const { data } = await axios.put(`/api/edit-user`, {
        ...current,        
      });
      toast("User updated!");
      const updateUser = await axios.get(`/api/update-user`);
      console.log("LOGIN RESPONSE", updateUser.data);  
      window.localStorage.setItem("user", JSON.stringify(updateUser.data));
      dispatch({
        type: "LOGIN",
        payload: updateUser.data,
      });
      // redirect
      router.push({ pathname, query }, asPath, { locale: current.language })
      router.push("/user");      
    } catch (err) {
      toast("Eroare");
    }
  };

 
  return (
    <UserRoute>
      <h1 >{t("user:edit-user")}</h1>
      {/* {JSON.stringify(values)} */}
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
      <div className="pt-3 pb-3 col-md-8">
      <UpdateUserForm 
          current={current}   
          handleSubmit={handleSubmit}
          setCurrent={setCurrent}
          t={t}
        />   
      </div>     
      </div>
      </div>
    </UserRoute>
  );
};

export default EditUser;
