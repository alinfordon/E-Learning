import { Button } from "antd";
import React from "react";
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

    return(
        <section className="project-section pt-100 pb-70 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="productive-content">
                            <span>{t('homepage:contact-us')}</span>
                            <h3>{t('homepage:funding')}</h3>
                            <p>{t('homepage:funding-p')}</p>
                            <div className="section-footer-logo">
                                <img src="/images/eramus.png" className="footer-logo" alt="logo" /> 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="">
                            <h3>{t('homepage:contact-us')}</h3>
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
                                <Button type="primary" shape="round" size="large" className="float-right ">{t('homepage:submit')}</Button>
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