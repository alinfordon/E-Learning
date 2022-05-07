import React from "react";

const OurProjects = () => {


    return(
        <section className="project-section pt-100 pb-70 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="productive-content">
                            <span>About Project</span>
                            <h3>Are you ready for ..... </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices Lorem Ipsum is simply dummy text.</p>
                            <div className="productive-btn">                                
                                <a href="/" className="productive-btn-one">Contact With Us<span></span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="productive-image">
                            <img src="/images/skills.jpg" alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurProjects;