import React from 'react';
import Moment from 'react-moment';

export default ({profile:profile}) =>{
    const {experience} = profile;
    return (
        <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {
            
            experience.map(exp=>(
               
                <div key={exp._id}>
                    <h3 className="text-dark">{exp.company}</h3>
                    <p><Moment format="D MMM, YYYY">{exp.from}</Moment> - { exp.to == null ? "Now":(<Moment format="D MMM, YYYY">{exp.to}</Moment>)}</p>
                    <p><strong>Position: </strong>{exp.title}</p>
                    {exp.description &&  <p>
                        <strong>Description: </strong>{exp.description}
                    </p> }
                </div>
            ))
        }
       
      </div>
    )
}