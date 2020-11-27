import React, { useState, Fragment } from 'react'
import Loader from '../../components/Loader/Loader'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function CreateCategory({apiRootUrl,token,requireAuth,match,errorMessage}) {

    const [loading,setLoading] = useState(false);

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            <main>
                <div className = "main__container">
                    <form>
                        <div>
                            <label>Name</label>
                            <input type = "text" />
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default CreateCategory
