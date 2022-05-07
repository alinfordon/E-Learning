import React from "react";

const AboutUs = () => {


    return (       
           <section class="about-section pt-100 pb-70 bg-white">
               <div class="container">
                   <div class="row align-items-center">
                       <div class="col-lg-6">
                           <div class="about-image">
                               <img src="/images/education.png" alt="image" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-content">
                                <span>About Us</span>
                                <h2>Focused On Actionable Insights</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                                <ul class="about-list">
                                    <li><i class="flaticon-tick"></i>Professional Consultancy Service</li>
                                    <li><i class="flaticon-tick"></i>24/7 Support Center</li>
                                    <li><i class="flaticon-tick"></i>Custom Service &amp; Operation</li>
                                    <li><i class="flaticon-tick"></i>Advanced Advisory Team</li>
                                </ul><a class="default-btn" href="/">Read More <span></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>       
    )
}

export default AboutUs;