import { FC } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardContent, Typography } from "@mui/material";
interface ChildProps {
  image: string;
  description: string;
}
const CardNFT: FC<ChildProps> = ({ image, description }) => {
  return (
    <>
      <Card style={{ width: "18rem", margin: "30px" }}>
        <CardMedia component="img" alt="nft" height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default CardNFT;
