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

  const { name, instructor, price, image, photo, slug, paid, category, language } = course;
  console.log(photo)
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
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
          <h2 className="font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>
          <Badge
            count={`Language: ${language}`}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
         <p className="font-weight-bold">{category.substring(0, 100)} ...</p>
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