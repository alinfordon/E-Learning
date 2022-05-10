import React from "react";

const AboutUs = () => {


    return (       
        <section className="project-section pt-100 pb-70 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="productive-content">
                            <span>About Us</span>
                            <h3>Description: </h3>
                            <p>The project aims to equip professionals in Europe with the necessary resources as to be able to cope with the online technologies and social distancing to better serve the excluded LGBTQI population as a result of the new situation that emerged from COVID-19 crisis. </p>
                            <p>This is a novel situation for the whole world, to which our proposed action will attempt to respond by using innovative tools and practices that exploit the benefits of ICT solutions in times when social distancing and all other precautionary measures are at the top of the EU’s priorities.</p>
                            
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

export default AboutUs;