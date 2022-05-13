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

const AboutUs = () => {
    const { t } = useTranslation();

    return (       
        <section className="project-section pt-100 pb-70 bg-white">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="productive-content">
                            <span>{t('homepage:about-us')}</span>
                            <h3>{t('homepage:description')}: </h3>
                            <p>{t('homepage:about-p-1')}</p>
                            <p>{t('homepage:about-p-2')}</p>
                            
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