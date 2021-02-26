import React, { useEffect } from 'react';
import {getGithubRepos} from '../../actions/profile';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';

const ProfileRepos = ({userName,getGithubRepos}) => {
    // console.log(userName);
    useEffect(()=>{
        if(userName) getGithubRepos(userName);
    },[getGithubRepos(userName)]);

    return(
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          <div className="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo One</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">Stars: 44</li>
                <li className="badge badge-dark">Watchers: 21</li>
                <li className="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
    )



}

ProfileRepos.prototype = {
    getGithubRepos:PropTypes.func.isRequired,
    repos:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    repos: state.profile.repos
});

export default connect(mapStateToProps,{getGithubRepos})(ProfileRepos);