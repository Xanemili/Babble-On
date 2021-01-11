import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { formatTime } from './utils';
import AvatarGroup from '@material-ui/lab/AvatarGroup';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';


const useStyles = makeStyles({
  root: {
    width: 345,
    // height: '300px'
  },
});

export default function CityJamsCard(props) {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch()
  // const location = userLocation();
  const userId = props.match.params.id


  const { firstName, photoUrl } = props.jam.host
  let { time, date, description, id, cityId, attending } = props.jam
  time = formatTime(time)



  const clickHandler = (e) => {
    history.push(`/jamsBrowser/user/${userId}/city/${cityId}/jamId/${id}`)
    // dispatch(setJam(id))
  }


  return (
    <Card onClick={clickHandler} className={classes.root}>
      <CardActionArea>

        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={photoUrl} className={classes.avatar}>
              R
          </Avatar>
          }
          titleTypographyProps={{ variant: 'h6' }}
          title={`Jam with ${firstName}`}
          subheader={`${date} | ${time}`}
        />
        <CardContent className='card-content'>
        {/* <AvatarGroup max={4}>
          {attending.map(user => {
            return <Avatar src={user.photoUrl}></Avatar>
          })} */}
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          {/* </AvatarGroup > */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}
