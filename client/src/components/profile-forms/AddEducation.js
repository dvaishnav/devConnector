import React,{useEffect, useState, Fragment} from 'react';
import PropType from 'prop-types';
import {Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled, toggledDisabled] = useState(false);

    const {school,degree,fieldofstudy,from,to,current,description} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData)
        addEducation(formData,history)
    }


   return (
       <Fragment>
           <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    required
                    onChange={e=>onChange(e)} value={school}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    required
                    onChange={e=>onChange(e)} value={degree}
                />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy"   onChange={e=>onChange(e)} value={fieldofstudy} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from"  onChange={e=>onChange(e)} value={from} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} onChange={e=>{setFormData({...formData,current:!current}); toggledDisabled(!toDateDisabled);}}  value={current} /> Current School or Bootcamp</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" onChange={e=>onChange(e)} value={to} disabled={toDateDisabled?"disabled":""}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    onChange={e=>onChange(e)} value={description}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
       </Fragment>
   )
}

AddEducation.propType = {
    auth :PropType.object.isRequired
}

{/* const mapStateToProps = state => ({
    auth:state.auth
}) */}

export default connect(null,{addEducation})(AddEducation);