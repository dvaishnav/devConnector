import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';

const Dashboard = ({getCurrentProfile,auth:{user},profile:{loading,profile}}) => {

    useEffect(()=>{
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>

        <h1 className='large text-primary'> Dashboard </h1>
        <p className='lead'>
            welcome { user && user.name}
        </p>
        {profile != null ? 
            <Fragment>Has</Fragment> : 
            <Fragment>
                <p>Please Create profile</p>
                <Link to="create-profile" className="btn btn-primary my-1">Create +</Link>
            </Fragment>}

    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{ getCurrentProfile })(Dashboard);