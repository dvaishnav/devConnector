import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {logout} from '../../actions/auth';


const NavBar = ({auth:{isAuthenticated, loading},logout}) => {

    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    <span className="hide-sm">Developers</span>
                </Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">logout</span>
                </a>
            </li>
        </ul>
    );

    const gustLinks = (
        <ul>
            <li> <Link to="/profiles">
                    <span className="hide-sm">Developers</span>
                </Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            { !loading && (isAuthenticated?authLinks:gustLinks)}
        </nav>
    )
}

NavBar.propTypes = {
    logout : propTypes.func.isRequired,
    auth: propTypes.object.isRequired 
}

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps,{logout})(NavBar);