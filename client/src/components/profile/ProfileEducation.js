import React from 'react';

import Moment from 'react-moment';

export default ({profile:profile}) =>{
    const {education} = profile;
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {education.map(edu=>(  
                <div key={edu._id}>
                    <h3>{edu.school}</h3>
                    <p><Moment format="D MMM, YYYY">{edu.from}</Moment> - { edu.to == null ? "Now":(<Moment format="D MMM, YYYY">{edu.to}</Moment>)}</p>
                    {edu.degree && <p><strong>Degree: </strong>{edu.degree}</p>}
                    
                    {edu.fieldofstudy && <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>}
                    {edu.description &&<p>
                        <strong>Description: </strong>{edu.description}
                    </p>}
                </div>
            ))}
          
        </div>
        
    )

}