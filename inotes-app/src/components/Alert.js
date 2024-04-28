import React from 'react'
export default function Alert(props) {
    const capitalize = (el) =>{
        if(el==="danger")
        return "Error";
        if(el==="primary")
        return "Kindly"
        let word = el[0].toUpperCase() +  el.slice(1).toLowerCase();
        return word;
    }
    return (
        <div>
           {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={{position:"absolute",top:"8%",zIndex:"10",width:"100%"}} role="alert">
                <strong>{capitalize(props.alert.type)}!</strong>  {props.alert.msg}
                {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}