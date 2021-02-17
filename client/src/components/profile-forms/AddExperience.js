import React,{useEffect, useState, Fragment} from 'react';
import PropType from 'prop-types';
import {Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({addExperience,history}) => {

    const [formData,setFormData] = useState({
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled, toggledDisabled] = useState(false);

    const {title,company,location,from,to,current,description} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData,history)
    }


    return(
        <Fragment>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=>onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" onChange={e=>onChange(e)} value={title} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" onChange={e=>onChange(e)} value={company} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" onChange={e=>onChange(e)} value={location} name="location" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" onChange={e=>onChange(e)} value={from} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} onChange={e=>{setFormData({...formData,current:!current}); toggledDisabled(!toDateDisabled);}}  value={current} /> Current Job</p>
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
                    placeholder="Job Description"
                    onChange={e=>onChange(e)} value={description}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddExperience.propType = {
    auth :PropType.object.isRequired
}

{/* const mapStateToProps = state => ({
    auth:state.auth
}) */}

export default connect(null,{addExperience})(AddExperience);