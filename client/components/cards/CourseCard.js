import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
import Image from 'next/image'

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;

  const myLoader = ({ src, width, quality }) => {
    return `${API_UP}/${src}?w=${width}&q=${quality || 75}`
  }

  const { name, instructor, price, image, photo, slug, paid, category, language, description } = course;
  
  return (
    <Link href={`/course/${slug}`} >
      <a>
        <Card
          className="shadow mt-4 mb-4 card-anim pe-auto"
          style={{ backgroundColor: "transparent", borderRadius: '5px' }}
          bodyStyle={{
            backgroundImage: "url('/images/papper.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            minHeight: "250px",
            maxWidth: "400px",
            borderRadius: '5px'
          }}
          cover={            
            <Image
              loader={myLoader}
              src={photo}
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
          <p className="font-weight-bold">{description}</p>
          <hr/>
          <h6 className="font-weight-bold">{name.substring(0, 100)}</h6>          
          <hr/>
          
          <Badge
            count={`Language: ${language}`}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;

/*
 <img
              src={photo ? `../${photo}`: "/course.png"}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
*/