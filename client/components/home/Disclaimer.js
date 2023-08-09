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

const Disclaimer = () => {
    const { t } = useTranslation();

    return(
        <section className="">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4">
                        <div className="productive-content">                            
                            <div className="section-footer-logo">
                                <img src="/images/eramus.png" className="footer-logo" alt="logo" /> 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="">
                            <p>The European Commission support for the production of this publication does not constitute an endorsement of 
                                the contents which reflects the views only of the authors, and the Commission cannot be held responsible for 
                                any use which may be made of the information contained therein.</p>                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Disclaimer;