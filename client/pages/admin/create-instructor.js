import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import { Button, Badge, Avatar, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AdminRoute from "../../components/routes/AdminRoute";
import { DeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import swal from "sweetalert";
import LocalSearch from "../../components/forms/LocalSearch";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["instructor"])),
    },
  };
}

const { Search } = Input;

const CreateInstructor = () => {
    const [loading, setLoading] = useState(false);
    const [userChange, setUserChange] = useState();
    const [email, setEmail] = useState();
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const { t } = useTranslation();
    const {
        state: { user },
    } = useContext(Context);

    const loadUser = async () => {
      const { data } = await axios.post(`/api/find-user`, {
        email: email,
      });
      console.log("User Find => ", data[0]);
      setUserChange(data[0]);
    };

    const loadUsers = async () => {
      const { data } = await axios.get(`/api/users`);      
      setUsers(data);
    };

    useEffect(() => {
      loadUsers();
    }, []);

    //console.log("Users in front => ", users);

    const addAdmin = async (e) => {
      e.preventDefault();
      const { data } = await axios.post(`/api/admin/add-role`, {
        email: email,
      });
      console.log("User Find => ", data[0]);
      setUserChange(data[0]);
      loadUser();
    }

    const addInstructor = async (e) => {
      e.preventDefault();
      const { data } = await axios.post(`/api/add-instructor`, {
        email: email,
      });
      console.log("User Find => ", data[0]);
      setUserChange(data[0]);
      loadUser();
    }

    const handleDeleteUser = async (role) => {    
      console.log(role);
      const willDelete = await swal({
        title: "Are you sure you want to delete?",
        icon: "warning",
        buttons: ["Cancel", true],
        dangerMode: true,
      })
      if (willDelete) {
        try {          
          const { data } = await axios.post(`/api/delete/${role}`, {
            email: email,
          });  
              setUserChange(data[0]); 
              loadUser();     
              toast("Instructor rights have been removed."); 
        } catch (err) {
          toast("Try again!");          
        }       
      }
    };

    const handleChange = e => {
      setEmail(e.target.value);   
      console.log(e.target.value)   
    }
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`/api/find-user`, {
          email: email,
        });
        console.log("User Find => ", data[0]);
        setUserChange(data[0]);       
        if (!data[0]) toast("User not found");
      } catch (err) {
        toast(err.data);
      }
    };
    

     
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);


    return (
        <AdminRoute>
            <h1 className="text-center p-4">Edit user rights</h1>
            <div className="container">
              <div className="row d-flex justify-content-center">
              <div className="col-md-5">
                <h5>Search user by email</h5>
                <form onSubmit={handleSubmit}>                 
                  <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"  
                    style={{ width: 304 }}                  
                    onChange={handleChange} 
                  />
                </div>
                <div className="row">
                <div className="col">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="btn btn-primary"
                    loading={loading}
                    type="primary"
                    size="large"
                    shape="round"
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>                  
                </div>                
              </div>
              </form>
              </div>
                {userChange ? 
                  <div className="col-md-7">
                  <Avatar
                    className="mb-4"
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: 'middle',
                      marginTop: 10,                 
                    }}
                    size={64}
                    src={userChange && userChange.avatar && userChange.avatar.Location} 
                    alt={userChange && userChange.name}
                  >
                    {userChange && userChange.name}
                  </Avatar>
                  
                  <p className="text-center h5" >{userChange && userChange.name}
                  <br/>{userChange && userChange.email} <br /><span className="font-italic text-warning h6">This user has {userChange.courses.length} Courses</span></p>
                  <hr />                  
                  <ul className="nav justify-content-start">                  
                  <h5>This user's rights: </h5>
                    {userChange && userChange.role.map((r) => (
                      <li className="nav-item ml-2 mr-2" key={r}>
                        <Badge count='X' onClick={() => handleDeleteUser(r)} className="pointer" alt={ <DeleteOutlined />}>
                          <Button disabled shape="round" className="text-success"> {r}</Button>  
                        </Badge>
                      </li>
                    ))}                    
                 </ul>    
                 <hr />
                 <div className="">
                 <h5>Add user rights: </h5>
                 <Button 
                    disabled={userChange && userChange.role.includes("Instructor")}
                    className="btn btn-primary mt-2"
                    loading={loading}
                    type="primary"
                    size="large"
                    shape="round" 
                    onClick={addInstructor}> Make Instructor</Button>
                    <span className="m-4"></span>
                    <Button 
                    disabled={userChange && userChange.role.includes("999U999")}
                    className="btn btn-primary mt-2"
                    loading={loading}
                    type="primary"
                    size="large"
                    shape="round" 
                    onClick={addAdmin}> Make Administrator</Button>
                 </div>                      
                </div> : 
                <div className="mt-4 text-center">
                  <UserSwitchOutlined className="display-1 pb-3" /><br/>
                  <h4>I haven't found a user yet. Please search ...</h4>
                  </div>
                }
                <hr/>
              </div>               
            </div> 
            <div className="container mt-4">
              <h1 className="student-title p-50">Users: {users.length}</h1>
              <div className="col-md-12">
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />                
                {users.filter(searched(keyword)).map((c) => (
                  <div className="alert alert-secondary" key={c._id}>
                    {c.name} | {c.email} | <span className="text-danger">Language: {c.language} </span>                   
                    <span className="float-right text-success">Enroled to {c.courses.length} units</span>
                    
                  </div>
                ))}
                </div>
              </div>            
        </AdminRoute>
    )
}

export default CreateInstructor;