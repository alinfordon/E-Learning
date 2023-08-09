import { Button } from "antd";
import { useState, useEffect, useContext } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'

export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["homepage"])),
      },
    };
  }

const Contact = () => {
    const { t } = useTranslation();
    const [send, setSend] = useState(true);

    return(
        <section className="project-section pt-100 pb-100 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="productive-content">                            
                            <h3>{t('homepage:funding')}</h3>
                            <p>{t('homepage:funding-p')}</p>
                            <div className="section-footer-logo">
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="">
                            <h3>{t('homepage:contact-us')}</h3>
                            {send ?
                            <form>
                            <input
                                type="text"
                                className="form-control mt-3 square"   
                                placeholder={t('homepage:name')}                               
                                required
                                />
                            <input
                                type="email"
                                className="form-control mt-3 square"   
                                placeholder={t('homepage:email')}                                
                                required
                                />
                            <textarea
                                    className="form-control mt-3"
                                    cols="7"
                                    rows="4"
                                    placeholder={t('homepage:content')}
                            ></textarea>
                            <div className="mt-3">                                
                                <Button onClick={() => setSend(false)} type="primary" shape="round" size="large" className="float-right ">{t('homepage:submit')}</Button>
                            </div>
                            </form>: 
                                <>
                                <h5 className="mt-4">Your message has been sent.</h5>
                                <Button onClick={() => setSend(true)} type="primary" shape="round" size="large" className="float-right ">Ok</Button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;