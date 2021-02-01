import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link,Redirect } from 'react-router-dom';
// import axios from 'axios'

// import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({login,isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        console.log({email,password});
        //register({name:'test',email,password});
        login({email,password});
        // try {

        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        //     const body = JSON.stringify(formData);
        //     const res = await axios.post('/api/auth/login', body, config);
        //     console.log(res.data);

        // } catch (err) {
        //     console.log(err.response.data);
        // }
    }

    //Redirect if loged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => onChange(e)}
                        name="password"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
    // register: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);