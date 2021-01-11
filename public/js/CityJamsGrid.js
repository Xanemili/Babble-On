import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { useHistory, useParams, Route } from 'react-router-dom';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CityJamsCard from './CityJamsCard'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // flexBasis: 'width',
    // flexGrow: 0,
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // maxWidth: '800px',
    height: 'auto'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function CityJamsGrid() {
  const classes = useStyles();
  const jams = useSelector(state => state.jams.jams)
  let history = useHistory();


  const clickHandler = (e) => {

  }

  if (!jams) return null

  return (
    // console.log(jams),
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {jams.map((jam) => {
          // console.log(jam)
          return (
            <>
              {/* <Route path={`${useLocation}/${jam.id}`} /> */}
              <Route key={jam.id} render={props=> <CityJamsCard {...props} jam={jam}/>} />
            </>
          )
        })}
      </GridList>
    </div>
  )
}
