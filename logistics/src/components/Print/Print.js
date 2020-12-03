import React, {Fragment,useRef} from 'react'
import ReactToPrint from 'react-to-print';
import OrderDetails from '../../pages/OrderDetails/OrderDetails';


function Print() {

    const componentRef = useRef();

    return (
        <Fragment>
            <div style = {{height:'35px'}}></div>
            <ReactToPrint 
                trigger = {()=><button className = "btn block">Print</button>}
                content = {()=>componentRef.current}
            />
            
           <div ref = {componentRef}>1</div>
        </Fragment>
    )
}

export default Print
