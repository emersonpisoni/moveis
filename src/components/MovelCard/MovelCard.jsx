import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MovelCard({ item: { name, images, city, uf, description } }) {
  return (
    <Link
      to={'/detail'}
      state={{ props: { name, images, city, uf, description } }}
      style={{ textDecoration: 'none' }}
    >
      <Card sx={{ width: 300, margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            src={images[0]}
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '70%',
              objectFit: 'contain'
            }}
          />
          <Divider />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="right" sx={{ fontWeight: 'bold' }}>
              {`${city} - ${uf}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}