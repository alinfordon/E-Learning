import { Button } from "antd";
import React from "react";

const Contact = () => {


    return(
        <section className="project-section pt-100 pb-70 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="productive-content">
                            <span>Contact</span>
                            <h3>FUNDING</h3>
                            <p>Co-funded by the Erasmus+ Programme of the European Union.
                                    Project number: 2020-1-UK01-KA226-VET-094572
                                    The content of the website reflects only the author’s view and that the Commission is not responsible 
                                    for any use that may be made of the information that the website contains.</p>
                            <div className="section-footer-logo">
                                <img src="/images/eramus.png" className="footer-logo" alt="logo" /> 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="">
                            <h3>Contact Us Form</h3>
                            <form>
                            <input
                                type="text"
                                className="form-control mt-3 square"   
                                placeholder="Name"                                
                                required
                                />
                            <input
                                type="email"
                                className="form-control mt-3 square"   
                                placeholder="Email"                                
                                required
                                />
                            <textarea
                                    className="form-control mt-3"
                                    cols="7"
                                    rows="4"
                                    placeholder="Content"
                            ></textarea>
                            <div className="mt-3">                                
                                <Button type="primary" shape="round" size="large" className="float-right ">Submit</Button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;