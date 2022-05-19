import { FC } from "react";
import Card from "react-bootstrap/Card";
interface ChildProps {
  image: string;
  description: string;
}
const CardNFT: FC<ChildProps> = ({ image, description }) => {
  return (
    <>
      <Card style={{ width: "18rem", margin: "30px" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{description}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardNFT;
