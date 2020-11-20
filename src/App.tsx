import React, { useEffect, useState } from 'react';
import { AppBar, Container, Toolbar, Typography, Button } from '@material-ui/core';
import { VideosTable } from './components/videos-table';
import { getVideos } from './services/videos';
import { Video } from './services/video.interface';
import { AddVideo } from './components/add-video'; 

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addVideo = (video: Video) => {
    setVideos([...videos, video]); 
  };

  const handleVideosResponse = (videos: Video[]) => {
    setVideos(videos);
  };

  useEffect(() => {
    getVideos().then(handleVideosResponse);
  }, []);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow : 1}}>Video Manager</Typography>
          <Button variant="outlined" style={{
                                background: 'green',
                            }} onClick={handleClickOpen}>
                 Add Video</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <VideosTable videos={videos} />
        <AddVideo open = {open} handleClose = {handleClose} videos = {videos} addVideo={addVideo}/>
      </Container>
    </>
  );
};

export default App;
