import { Card, Badge } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const API_UP = process.env.NEXT_PUBLIC_UPLOAD;
  const { name, instructor, price, image, photo, slug, paid, category, language } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={photo ? `${API_UP}/${photo}` : "/course.png"}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
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
