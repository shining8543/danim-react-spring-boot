import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ManagerMenu from '../manager-menu/manager-menu';
import {
  makeStyles,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  listPic: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(1),
  },
  storyMetaData: {
    textAlign: 'center',
  },
  inline: {
    display: 'inline',
  },
  button: {
    color: 'white',
  },
  story: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyInfo: {
    textAlign: 'center',
  },
  managerOptions: {
    paddingTop: theme.spacing(1),
  },
  icon: {
    color: '#667580',
  },
  temp: {
    color: 'darkgrey',
  },
  published: {
    color: 'blue',
  },
}));

const Stories = observer(({ stories, onDelete, isManager }) => {
  const classes = useStyles();
  const history = useHistory();

  const readStory = (storyNo) => {
    history.push('/read/' + storyNo);
  };

  const getStoryStatus = (type) => {
    switch (type) {
      case 'TEMP':
        return classes.temp;
      case 'PUBLISHED':
        return classes.published;
      default:
        throw new Error(`unknown type ${type}`);
    }
  };

  return (
    <List className={classes.root}>
      {stories.map((story) => (
        <ListItem
          className={classes.story}
          alignItems="flex-start"
          key={story.storyNo}
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              alt={story.title}
              className={classes.listPic}
              src={
                process.env.REACT_APP_IMAGE_BASE_URL +
                story.nickname +
                '/' +
                story.thumbnail
              }
              onClick={() => readStory(story.storyNo)}
            />
          </ListItemAvatar>
          {isManager ? (
            <section className={classes.storyMetaData}>
              <ListItemText
                className={classes.storyInfo}
                primary={story.title}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {`${story.duration - 1}박 ${story.duration}일`}
                  </Typography>
                }
              />

              <Typography
                component="span"
                variant="body2"
                className={getStoryStatus(story.status)}
                color="textPrimary"
              >
                {story.status === 'TEMP' ? '임시' : '완료'}
              </Typography>
            </section>
          ) : (
            <ListItemText
              className={classes.storyInfo}
              primary={story.title}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${story.duration - 1}박 ${story.duration}일`}
                </Typography>
              }
            />
          )}

          {isManager && (
            <ManagerMenu storyNo={story.storyNo} onDelete={onDelete} />
          )}
        </ListItem>
      ))}
    </List>
  );
});

export default Stories;
