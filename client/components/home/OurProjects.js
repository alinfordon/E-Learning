import React from "react";

const OurProjects = () => {


    return(
        <section className="about-section pt-100 pb-70 bg-white">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="about-image">
                        <img src="/images/education.png" alt="image" />
                     </div>
                 </div>
                 <div className="col-lg-6">
                     <div className="about-content">
                         <span>About Project</span>
                         <h2>Project objectives:</h2>
                         <ul className="about-list">
                             <li><i className="flaticon-tick"></i>To support professionals, relief aid officers, social workers, 
                             mental health, health care providers on how to better include intersectionality and LGBTQI perspectives in their activities</li>
                             <li><i className="flaticon-tick"></i>To enhance their acquisition of digital competences and enable to incorporate in their 
                             work do delivery high quality and inclusive support in order to meet the needs of LGBTQI beneficiaries</li>
                             <li><i className="flaticon-tick"></i>To create and incentive for VET, adult education, professionals, 
                             and stakeholder to adopt the project approach after project closure</li>
                             <li><i className="flaticon-tick"></i>To strengthen transnational learning and cooperation’s networks of institutions, 
                             CSO’s, public bodies/services, community centers, helplines, professionals and foster social inclusion and equality, 
                             ensuring that LGBTQI people is included in all health, humanitarian and economic relief efforts</li>
                             <li><i className="flaticon-tick"></i>To raise awareness of medical and mental health inequalities faced by the LGBTQI community</li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
     </section>      
    )
}

export default OurProjects;