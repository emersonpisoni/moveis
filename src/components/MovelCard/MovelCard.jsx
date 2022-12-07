import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MovelCard({ item: { titulo, descricao, imagens = [], id, requisicoes, cidade, estado }, withAction, requisitionsCallback, user, deleteCallback }) {
  return (
    <Link
      to={withAction ? '/detail' : '#'}

      state={{ props: { titulo, descricao, user, imagens, id, requisicoes, cidade, estado } }}
      style={{ textDecoration: 'none', position: 'relative' }}
    >
      <Card
        onClick={() => requisitionsCallback(requisicoes)}
        sx={{ width: 300, margin: 2, cursor: !!requisicoes?.length && 'pointer' }}
      >
        {requisicoes?.length > 0 && <Chip sx={{ position: 'absolute', top: '0px', right: '0px', backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }} label={requisicoes.length} />}
        {deleteCallback && <Button onClick={() => deleteCallback(id, titulo)} variant='contained' sx={{ position: 'absolute', top: '0px', left: '0px', backgroundColor: 'red', color: 'white', fontWeight: 'bold', padding: 0 }}>
          X
        </Button>}
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            src={imagens[0] ? `data:image/jpeg;base64,${imagens[0].binario}` : ''}
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
                  {`${cidade} - ${estado}`}
                </Typography>
              } />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link >
  );
}