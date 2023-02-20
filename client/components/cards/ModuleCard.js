import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
import Image from 'next/image'

const { Meta } = Card;

const ModuleCard = ({ module, isSetModules, setModul }) => {
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;

  const myLoader = ({ src, width, quality }) => {
    return `${API_UP}/${src}?w=${width}&q=${quality || 75}`
  }

  const { name, instructor, price, image, photo, slug, paid, category, language, description } = module;
  
  return (
    <div>
      <a onClick={(e) => {isSetModules(false), setModul(category)}}>
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          cover={
            
            <Image
              loader={myLoader}
              src={photo && photo}
              alt="Picture of the author"
              layout="responsive"
              objectFit='cover'
              height={200}
              width={500}
              //style={{ height: "200px", objectFit: "cover" }}
              //className="p-1"
            />
            
          }
        >
          <h5 className="font-weight-bold">{name}</h5> 
          <hr/>           
          <p className="font-weight-bold">{description.substring(0, 110)}...</p>        
          <hr/>
          
          <Badge
            count={`Language: ${language}`}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          
        </Card>
      </a>
    </div>
  );
};

export default ModuleCard;

/*
 <img
              src={photo ? `../${photo}`: "/course.png"}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
*/