import React, {useState, useEffect} from 'react'
import './FeaturedCategories.css'
import axios from 'axios'
import Category from '../Category/Category';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },      
}));

function FeaturedCategories({apiRootUrl}) {
    const classes = useStyles();

    const [categories, setCategories] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${apiRootUrl}category`)
        .then(res=>{
            setCategories(res.data);
            setIsLoading(false);
        });
    },[apiRootUrl]);


    return (
        <React.Fragment>
            {
                 isLoading && (
                    <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                    </Backdrop>
                )
            }
            <div className = "categories">
                  <h2 className = "title" style = {{marginTop:'-30px'}}>All Categories</h2>
                <div className = "row" style = {{marginTop:'-30px'}}>
                    {
                        (categories.map(({id,name,image})=><Category key = {id} id = {id} name = {name} image = {image}  apiRootUrl = {apiRootUrl} />))
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default FeaturedCategories
