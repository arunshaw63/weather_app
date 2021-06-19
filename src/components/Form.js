import React from 'react'
import './Form.css';
function Form(props) {
    return (
        <div className="container">
            <div>{props.error?error():null}</div>
            <form onSubmit={props.loadweather}>
            <div className="row">
                <div className="col-md-3 offset-md-2">
                    <input type="text" className="form-control" name="city" placeholder="city"/>
                </div>

                <div className="col-md-3">
                <input type="text" className="form-control" name="country" placeholder="country"/>
                </div>

                <div className="col-md-3 mt-md-0 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div>
            </form>
            
        </div>
    )
}
function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    )
}
export default Form;