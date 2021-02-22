import React, { Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import Spinner from '../layout/Spinner';

import {getProfileById} from '../../actions/profile';

const Profile = ({getProfileById,match,profile:{profile,loading},auth}) => {

    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById])
    return (<Fragment>
        {profile == null || loading ? Spinner:<Fragment>

            
        </Fragment>}
    </Fragment>);
}

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile);