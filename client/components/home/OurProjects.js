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

const OurProjects = () => {
    const { t } = useTranslation();

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
                         <span>{t('homepage:about-project')}</span>
                         <h2>{t('homepage:project-objectives')}:</h2>
                         <ul className="about-list">
                             <li><i className="flaticon-tick"></i>{t('homepage:project-p-1')}</li>
                             <li><i className="flaticon-tick"></i>{t('homepage:project-p-2')}</li>
                             <li><i className="flaticon-tick"></i>{t('homepage:project-p-3')}</li>
                             <li><i className="flaticon-tick"></i>{t('homepage:project-p-4')}</li>
                             <li><i className="flaticon-tick"></i>{t('homepage:project-p-5')}</li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
     </section>      
    )
}

export default OurProjects;