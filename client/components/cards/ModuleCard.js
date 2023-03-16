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
          className="shadow mt-4 mb-4 card-anim pe-auto"
          style={{ backgroundColor: "transparent", borderRadius: '5px' }}
          bodyStyle={{
            backgroundImage: "url('/images/papper.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            minHeight: "280px",
            maxWidth: "400px",
            borderRadius: '5px'
          }}
          cover={            
            <Image
              loader={myLoader}
              src={photo && photo}
              alt="Picture of the author"
              layout="responsive"
              objectFit='cover'
              height={200}
              width={500}              
            />            
          }
        >
          <h5 className="font-weight-bold">{name}</h5> 
          <hr/>           
          <p className="font-weight-bold">{description}</p>    
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