import React,{useEffect,Fragment} from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { getCurrentProfile,deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({getCurrentProfile,auth:{user},profile:{loading,profile},deleteAccount}) => {

    useEffect(()=>{
        getCurrentProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <Fragment>

        <h1 className='large text-primary'> Dashboard </h1>
        <p className='lead'>
            welcome { user && user.name}
        </p>
        
        {profile != null ? 
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                {/* delete account */}
                <div className="my-2">
                    <button onClick={()=>deleteAccount()} className="btn btn-danger">Delete Account</button>

                </div>
            </Fragment> : 
            <Fragment>
                <p>Please Create profile</p>
                <Link to="create-profile" className="btn btn-primary my-1">Create +</Link>
            </Fragment>}

    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps,{ getCurrentProfile,deleteAccount })(Dashboard);