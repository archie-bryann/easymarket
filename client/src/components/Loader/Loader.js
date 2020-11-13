import React, { Fragment } from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },      
}));

function Loader() {

    const classes = useStyles();
    
    return (
        <Fragment>
            <Backdrop className={classes.backdrop} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    )
}

export default Loader
