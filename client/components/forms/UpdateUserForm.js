import { Button, Progress, Switch, Select, Badge, Avatar } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";

const { Option, OptGroup } = Select;


const UpdateUserForm = ({
  current,  
  setCurrent,
  handleSubmit,
  t,  
}) => {
const router = useRouter();
const { pathname, asPath, query } = router

function handleChange(value) {    
    //locale={value};       
    //router.push({ pathname, query }, asPath, { locale: value })
    setCurrent({ ...current, language: value })
    //router.push({ pathname, query }, asPath, { locale: value })
    console.log("VALUE: ", value)
  }

  console.log("CURENT LANGUAGE: ", current.language);
  return (
    <div className="container pt-3">
      {/* {JSON.stringify(current)} */}
      <form onSubmit={handleSubmit}>
      <div className="form-group pt-3"> 
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setCurrent({ ...current, name: e.target.value })}
          value={current && current.name} 
          autoFocus
          
        />
        </div>
        <div className="form-group pt-3">   
        <label>{t("user:prefered-language")}</label>
       <Select 
            className="nav-language" 
            value={current && current.language} 
            style={{ width: 80 }} 
            onChange={handleChange}>
            {router.locales.map((locale) => (
                <Option value={locale} className="nav-item text-dark" key={locale}>
                    {locale}
                </Option>
            ))}                                      
        </Select>
        </div>
        <Button
          onClick={handleSubmit}
          className="col mt-3"
          size="large"
          type="primary"          
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
