import React from 'react';
import Button from '@material-ui/core/Button';
import { TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Video } from '../services/video.interface';

export function AddVideo(props: any) {
  const [videoName, setVideoName] = React.useState<string>('');

  const [author, setAuthor] = React.useState<string>('');

  const [categories, setCategories] = React.useState<string[]>([]);

  const authorsList = new Set<string>(props.videos.map((video: Video) => {
    return video.author;
  }));

  let categoriesList = new Set<string>(props.videos.map((video: Video) => {
      return video.categories;
  }).flat());



  const onVideoNamechange = (event: React.ChangeEvent<{ value: unknown }>) => {
          setVideoName(event.target.value as string);
  };

  const onVideoAuthorchange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAuthor(event.target.value as string);
};

const onCategoriesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  setCategories(event.target.value as string[]);
};

const submitForm = () => {
  
  const ids = props.videos.map((vid: Video) => {
    return vid.id;
  });

  const id = Math.max(...ids) + 1;
  const video = new Video(id, videoName, author, categories);
   props.handleClose();
   props.addVideo(video);
};

const isDisabled = () => {
  return !(videoName !== '' && author !== '' && categories.length > 0)
}

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
        <DialogContent>
          <form>
          <TextField
            id="video-name"
            label="Video Name"
            type="text"
            value={videoName}
            onChange={onVideoNamechange}
            fullWidth
          />

        <FormControl fullWidth>
          <InputLabel id="video-author">Video Author</InputLabel>
          <Select
            labelId="video-author"
            id="video-author-select"
            fullWidth
            value={author}
            onChange={onVideoAuthorchange}
          >
            {Array.from(authorsList).map((auth) => <MenuItem key = {auth} value={auth}>{auth}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel shrink htmlFor="select-multiple-native">
          Categories
        </InputLabel>
        <Select
          multiple
          value={categories}
          onChange={onCategoriesChange}
        >
          {Array.from(categoriesList).map((cat) => <MenuItem key = {cat} value={cat}>{cat}</MenuItem>)}
        </Select>
      </FormControl>
          </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={submitForm} disabled={isDisabled()} color="primary">
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}