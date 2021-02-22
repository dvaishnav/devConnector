import React, { Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getProfiles} from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Profileitems = ({key,profile:{
    user:{
        _id,
        name,
        avatar
    },
    status,
    company,
    location,
    skills
}}) =>{                  
        return( 
        <div key={key} className="profile bg-light" >
            <img
                className="round-img"
                src={avatar}
                alt=""
            />
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p>{location && <span> {location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>

            <ul>
                {skills.slice(0,4).map((skill,index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
        )
}


Profileitems.propTypes = {
  profile:PropTypes.object.isRequired 
};

// const mapStateToProps = state =>({
//     profile: state.profile
// });


export default Profileitems;