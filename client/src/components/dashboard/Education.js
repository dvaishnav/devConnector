import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment'
import { connect } from 'react-redux';
import { deleteEducation }  from '../../actions/profile';

const Education = ({education,deleteEducation}) =>{
    const educations = education.map(edu=>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - { edu.to == null ? "Now":(<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
            </td>
            <td><button onClick={()=>{deleteEducation(edu._id)}} className="btn btn-danger">Delete</button></td>
        </tr>
    ));
    console.log(educations);
    return(
        <Fragment>
            <h2 className="my-2">Education</h2>
            {educations.length == 0?(<div>Data Not Found</div>):(
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                </table>
            )}

        </Fragment>
    );
};

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education);