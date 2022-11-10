import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MovelCard({ item: { titulo, descricao }, withAction, user }) {
  return (
    <Link
      to={'/detail'}
      state={{ props: { titulo, descricao, user } }}
      style={{ textDecoration: 'none', pointerEvents: !withAction && 'none' }}
    >
      <Card sx={{ width: 300, margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            // src={images[0]}
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
              {titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {descricao}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Chip sx={{ mt: 1, ml: 'auto' }} label={
                <Typography variant="body2" color="text.secondary" align="right" sx={{ fontWeight: 'bold' }} >
                  {`${'teste'} - ${'teste'}`}
                </Typography>
              } />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link >
  );
}