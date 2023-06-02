import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";
import axios from "axios";
import { Avatar } from "antd";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
import LocalSearch from "../../components/forms/LocalSearch";


export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["user"])),
      },
    };
  }


const AdminIndex = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const {
        state: { user },
      } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");

    const loadUsers = async () => {
      const { data } = await axios.get(`/api/users`);      
      setUsers(data);
    };
  
    useEffect(() => {
      loadUsers();
    }, []);

    const filteredUsersByLanguageEn = users.filter(filteredUser =>{
      return  "en" === filteredUser.language;             
    }, []);

    const filteredUsersByLanguageRo = users.filter(filteredUser =>{
      return  "ro" === filteredUser.language;             
    }, []);

    const filteredUsersByLanguagFr = users.filter(filteredUser =>{
      return  "fr" === filteredUser.language;             
    }, []);

    const filteredUsersByLanguagEl = users.filter(filteredUser =>{
      return  "el" === filteredUser.language;             
    }, []);

    const filteredUsersByLanguagPt = users.filter(filteredUser =>{
      return  "pt" === filteredUser.language;             
    }, []);

    const filteredUsersByLanguagNl = users.filter(filteredUser =>{
      return  "nl" === filteredUser.language;             
    }, []);

    
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);  

    return(
        <AdminRoute>
            {loading && (
            <SyncOutlined
                spin
                className="d-flex justify-content-center display-1 text-danger p-5"
            />
            )}
            <h1 className="text-center p-4">{t("user:user-dashboard")}</h1>
            
            <h5 className="student-title">{t("user:users")}: {users.length}</h5>
            <hr/>
            <div className="row d-flex justify-content-center">
              <h5 className="text-info p-4">{t("user:users")} EN: {filteredUsersByLanguageEn.length}</h5>
              <h5 className="text-info p-4">{t("user:users")} RO: {filteredUsersByLanguageRo.length}</h5>
              <h5 className="text-info p-4">{t("user:users")} FR: {filteredUsersByLanguagFr.length}</h5>
              <h5 className="text-info p-4">{t("user:users")} EL: {filteredUsersByLanguagEl.length}</h5>
              <h5 className="text-info p-4">{t("user:users")} PT: {filteredUsersByLanguagPt.length}</h5>
              <h5 className="text-info p-4">{t("user:users")} NL: {filteredUsersByLanguagNl.length}</h5>
            </div>
            <div className="container mt-4">              
              <div className="col-md-12">
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />                
                {users.filter(searched(keyword)).map((c) => (
                  <div className="alert alert-secondary" key={c._id}>
                    {c.name} - <span className="text-info">Language: {c.language}</span>                    
                    <span className="float-right text-success">Enroled to {c.courses.length} Units</span>
                  </div>
                ))}
                </div>
              </div>   
        </AdminRoute>
    )
}

export default AdminIndex;