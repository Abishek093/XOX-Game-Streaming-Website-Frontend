import React from 'react';
import { Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const PostFeed: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 'full', maxHeight: 'auto' ,margin: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <Avatar aria-label="user-avatar" src="/src/assets/sample.jpg" />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="subtitle1">Lester Barry</Typography>
          <Typography variant="body2" color="textSecondary">17 days ago</Typography>
        </Box>
      </Box>
        <CardMedia
          component="img"
          sx={{ height: 400, width: 1020, paddingLeft: 9 }}
          image="/src/assets/sample.jpg"
          title="Gaming"
        />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is a description of the post. It can be a brief summary or any relevant information you want to display.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button aria-label="like" startIcon={<FavoriteIcon />}>
          Like
        </Button>
        <Button aria-label="comment" startIcon={<CommentIcon />}>
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostFeed;
