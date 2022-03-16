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

    const addInstructor = async (e) => {
      e.preventDefault();
      const { data } = await axios.post(`/api/add-instructor`);
      console.log("User Find => ", data[0]);
      setUserChange(data[0]);
      loadUser();
    }

    const handleDeleteUser = async () => {    
      const willDelete = await swal({
        title: "Are you sure you want to delete?",
        icon: "warning",
        buttons: ["Cancel", true],
        dangerMode: true,
      })
      if (willDelete) {
        try {
          setLoading(true);
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/user/delete/send`, { name: user.name, email: user.email });            
          if(data.ok){
              toast("Cerere trimisa.");            
              setLoading(false);
          }            
        } catch (err) {
          toast("Nu am trimis cererea, Incercati din nou");
          setLoading(false);
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
    

     
    console.log("User Find => ", email);


    return (
        <AdminRoute>
            <h1 className="text-center p-4">Create Instructor</h1>
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
                  <br/>{userChange && userChange.email}</p>
                  <hr />
                  {userChange && <h5>This user has {userChange.courses.length} Courses</h5>}<br />
                  <ul className="nav justify-content-start">                  
                  <h5>This user's rights: </h5>
                    {userChange && userChange.role.map((r) => (
                      <li className="nav-item ml-2 mr-2" key={r}>
                        <Badge count='X' onClick={handleDeleteUser} className="pointer" alt={ <DeleteOutlined />}>
                          <Button disabled shape="round" className="text-success"> {r}</Button>  
                        </Badge>
                      </li>
                    ))}                    
                 </ul>    
                 <hr />
                 <div className="">
                 <h5>Add instructor rights: </h5>
                 <Button 
                    disabled={loading}
                    className="btn btn-primary"
                    loading={loading}
                    type="primary"
                    size="large"
                    shape="round" 
                    onClick={addInstructor}> Make Instructor</Button>
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
        </AdminRoute>
    )
}

export default CreateInstructor;