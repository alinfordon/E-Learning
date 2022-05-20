import { useState } from "react";
import { Modal, Button } from 'antd';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { DoubleRightOutlined  } from "@ant-design/icons";


export async function getStaticProps({locale}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["homepage"])),
      },
    };
  }

const OurPartners = () => {
    const [isHipVisible, setIsHipVisible] = useState(false);
    const [isCCWVisible, setIsCCWVisible] = useState(false);
    const [isSIMVisible, setIsSIMVisible] = useState(false);
    const [isAKMVisible, setIsAKMVisible] = useState(false);
    const [isSPELVisible, setIsSPELisible] = useState(false);
    const { t } = useTranslation();

    return(
        <div className="partner-section pt-100 pb-70">
            <div className="container">
                <div className="partner-title">
                <span>{t('homepage:partners')}</span><h2>{t('homepage:partners-organization')}</h2>
            </div>
            <div className="partner-list">
            <div className="partner-item">
            <Modal title="Hub for Innovation Policy (HIP)" 
                    className="modalStyle"
                    visible={isHipVisible} 
                    onOk={() => setIsHipVisible(false)} 
                    onCancel={() => setIsHipVisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://hubinno.eu/"
                          type="link"  
                          target="_blank"                      
                          onClick={() => setIsHipVisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                    >
                <p>Hub for Innovation Policy (HIP) is a start-up company focusing on the mission of utilizing innovation and technology for advancing and empowering the services of business and social actors. The main vehicles that we utilize for this purpose include ICT tools, Capacity Building Programmes and Consulting services.</p>
                <p>Our team includes experts coming from multidisciplinary backgrounds, but with solid background and expertise in working with market stakeholders and the Third Sector at international level. Our cumulative experience and track record includes successful collaboration with companies of various industries and economic sectors, institutions and Local Authorities in various EU countries, the European Commission and NGOs & Organizations active in the field of human rights.</p>
                <p>Our approach is customer-driven, based on close and regular cooperation and interaction with our customers and partners, for achieving actually tailor-made solutions meeting their particular needs and challenges.</p>
            </Modal>
            <a onClick={() => setIsHipVisible(true)}>
                <div className="img-container">
                    <img src="/images/logo/Hip-150.jpg" className="fake-img" alt="image" />
                </div>            
            </a>
            </div>
            <div className="partner-item">
            <Modal title="CCW-Training Academy" 
                    className="modalStyle"
                    visible={isCCWVisible} 
                    onOk={() => setIsCCWVisible(false)} 
                    onCancel={() => setIsCCWVisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://www.careerchangewales.co.uk"
                          type="link"    
                          target="_blank"                      
                          onClick={() => setIsCCWVisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                      >
                <p>CCW-Training Academy provide Vocational Training in Cardiff. CCW-Training Academy is an accredited ilm, BCS, AAT, and CIHT approved training provider and test centre in Wales. We are built on passion, creativity and excellence. We are a totally customer focused and our objectives encompasses full customer satisfaction. We are therefore flexible and responsive to our client needs and requirements.</p>
                <p>Our training academy offers many open and bespoke training courses. Our blended long-term training experience, and working with over 100 SMEs, public and private sector organisations in United Kingdom and Europe gives us an edge in the training sector</p>
                <p>We offer consultancy services in the following specialist areas: Personal coaching and mentoring services bespoke to any company; Health & Safety training and Consultancy works; and bespoke Bid Writing services</p>
            </Modal>
            <a onClick={() => setIsCCWVisible(true)}>
                <div className="img-container">
                    <img src="/images/logo/CCW-150.jpg" className="fake-img" alt="image" />
                </div>            
            </a>
            </div>
            <div className="partner-item">
            <Modal title="SYMPLEXIS short Bio" 
                    className="modalStyle"                    
                    visible={isSIMVisible} 
                    onOk={() => setIsSIMVisible(false)} 
                    onCancel={() => setIsSIMVisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://symplexis.eu/"
                          type="link"    
                          target="_blank"                      
                          onClick={() => setIsSIMVisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                      >
                <p>Symplexis is a Greek non-for-profit organization that strives to ensure equal opportunities for all through actions and measures that build skills, empower and promote active engagement and participation focusing on the most vulnerable categories of the population and particularly those with fewer opportunities. Symplexis’ mission is to elevate social cohesion through integrated actions and project-based activities that aim at promoting the inclusion of disadvantaged groups at risk of marginalization and exclusion, while promoting and protecting the rights of various types of population groups that face discrimination focusing on the empowerment and support of victims, awareness raising and information sharing at all level.</p>
                <p>Symplexis’ activity builds on user-led approaches and interventions around four main axes of expertise, namely:</p>
                <ul> 
                    <li>The social and economic inclusion of those most in need comprising a wide variety of activities aimed at reducing poverty, preventing marginalisation and promoting the sustainable integration of disadvantaged groups, particularly focusing on Third Country Nationals.</li>
                    <li>The protection and promotion of human rights through activities and interventions that address the needs of a wide range of discriminated population groups, such as women, children and elderly people, victims of violence and human trafficking, the LGBTQI community, Roma and unaccompanied minors, migrants and asylum seekers/ refugees. </li>
                    <li>Upskilling, capacity building and empowerment of vulnerable groups with the aim to promote equal access to formal and non-formal education for all and promote lifelong learning focusing on low-skills individuals that face difficulties in (re) the labour market. </li>
                    <li>Child and youth development through actions and projects designed to reduce youth poverty, promote child protection and stimulate social inclusion and development.</li>
                </ul>                
            </Modal>
            <a onClick={() => setIsSIMVisible(true)}>
                <div className="img-container">
                    <img className="fake-img" src="/images/logo/Symplexis-150.png"  alt="image"/>
                </div>
            </a>
            </div>
            <div className="partner-item">
            <Modal title="Short presentation of the organization" 
                    className="modalStyle"                    
                    visible={isAKMVisible} 
                    onOk={() => setIsAKMVisible(false)} 
                    onCancel={() => setIsAKMVisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://www.akmi-kek.gr/"
                          type="link"    
                          target="_blank"                      
                          onClick={() => setIsAKMVisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                      >
                <p>Universal Education was established in 2000 and was certified as a Level 2 National Centre for Vocational Training (K.D.V.M.2) by the National Organization for the Certification of Qualifications and Vocational Guidance (EOPPEP). It has more than 25 years of experience in the field of Vocational Education and Training and Lifelong Learning, focusing on pioneering learning methodologies/activities and having presence in Athens and Thessaloniki.</p>
                <p>Currently, it offers both long-term and short-term courses in a variety of fields and provides a "hands-on" orientation by operating fully equipped laboratories, simulating the real conditions of everyday professional life or supporting the courses with WBL assignments.</p>
                <p>The thematic fields of training are:</p>
                <ul> 
                    <li>Economy and Management  </li>
                    <li>Informatics, Tourism & Provision of Services</li>
                    <li>Culture & Sports, Environment</li>
                    <li>Health & Providence</li>
                    <li>Pedagogy  </li>
                    <li>Agricultural & Rural</li>
                    <li>Technical & Transportation</li>
                </ul>   
                <p>In addition, Universal Education also holds a strong background in adult education; it attracts a wide range of learners from various ages and social groups. The main target groups are between 18-29 and 30-45 and come from different socio-economic environments, including vulnerable groups, such as the long-term unemployed, migrants, people living in marginalized areas etc.</p>             
                <p>Furthermore, the organization has a vast experience in the implementation of national and EU-funded projects focusing on: </p>
                <ul> 
                    <li>Continuing vocational training programs funded by the ESF and addressed mostly to adults (people over 18 years old)  </li>
                    <li>Training programs for personnel by Manpower Employment Organization</li>
                    <li>National/Transnational/EU-funded Projects</li>
                    <li>Complementary and supportive actions and services towards employment, integration of disadvantaged groups, social cohesion, equal opportunities and environmental protection</li>                    
                </ul>  
                <p>Partnership in EU-funded projects</p>
                <ul> 
                    <li>Tour2Include (2019-1-DE02-KA204-006478)</li>
                    <li>Cooking Cultures (2019-1-TR01-KA204-074418)</li>
                    <li>First Step (CY/2019/AMIF/SO2.NO2.2)</li>
                    <li>WildMapsFit (KA202-C749E635)</li>
                    <li>Restore (2021-1-DE02-KA220-ADU-000029489)</li>
                    <li>MigrAction (2021-1-DE02-KA202-ADU-000026992</li>                   
                </ul> 
            </Modal>
            <a onClick={() => setIsAKMVisible(true)}>
                <div className="img-container">
                    <img className="fake-img" src="/images/logo/KEK-150.png"  alt="image" />
                </div>
            </a>
            </div>
            <div className="partner-item">
            <Modal title="Sociedade Promotora de Estabelecimentos de Ensino, Lda" 
                    className="modalStyle"
                    visible={isSPELVisible} 
                    onOk={() => setIsSPELisible(false)} 
                    onCancel={() => setIsSPELisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://spel.com.pt"
                          type="link"    
                          target="_blank"                      
                          onClick={() => setIsSPELisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                      >
                <p>SPEL participates in this project as a pedagogical innovator and pilot-tester and will provide the perspective of a country with high inequality of opportunities on education, high qualification needs for the teachers and also high motivational needs for the teachers to participate in professional development activities. SPEL is a network of schools especially focused on pilot-testing, incorporating and further transferring innovative good practices on psycho-socio-pedagogies for the integration and empowerment of socio-economically vulnerable people. </p>
                <p>SPEL will adapt and incorporate the project outputs into the Educational Plan of its schools and will sustainably transfer it to the future teachers, by incorporating the good practices of the project into the Train-the-Trainers training programme, which is mandatory by law for technicians that want to become VET trainers.</p>
                
            </Modal>
            <a onClick={() => setIsSPELisible(true)}>
                <div className="img-container">
                    <img className="fake-img" src="/images/logo/SPEL-150.png" alt="image"/>
                </div>            
            </a>
            </div>
            <div className="partner-item">
            <a href="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABYCAMAAABVnIDyAAAC61BMVEWx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/WaZP5HAAAA+HRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJj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" alt="image"/>
            </a>
            </div>
            <div className="partner-item"><a href="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABPCAMAAAAUXj2YAAAC3FBMVEWx5/X///+x5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/Wx5/UlJn+HAAAA83RSTlMAAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDI0NTY3ODk6Ozw9PkBBQkNERUZHSElLTE1OT1BRU1RVV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ4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" alt="image"/>
            </a>
            </div>
            <div className="partner-item">
            <a href="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAABYCAYAAACjxTpsAAAFRElEQVR42uyce4gVVRzHj7PuWuuKmogiVqYiWYQPzMzt4SMfKGqIGBaUaHvdSkSJSkUUU/8wDBXLt7K+IeqPiFARn1RkTwPfgrpUrmKklZLrY/X3c76HnT1z5nrvemfv3Lm/H3y59849M+fM5/x+55yZM3MafVl1VaVoo0nTSRdINSqmNrJt8ajGaaQ/QnqU9LSKuTlppD1BakPaLVD89hJpj0Dx20DSXoHitwFx9RjnPvdnj9knUPzWP26h5GToOAPi5DFOBo/VPy5gnAwfLxZgnBCOyWDW5DIUHuZPJpVk8HrmMukk6TTpc4yCnSye48ukZulCWRZSYS5jHLMzyxV/lNQ13fC5GFJhWpB2kMqzDKUwCm2KaSsQonnd0NpsWQQ8JnJQtMe8I1D89gnpLYHit+VRD6VsjR84lN4WKH77lDQpqiPaVOw3UjWpHal9BvNfSSpASOWUp/Dwvx/pGdLikDwmkYvhU4LPopDKsSpKbYyTZpgVhNzGJHIJSkPZqiiMY6IGRY9jEgLF7jHlAsU+wEsIFLvHTBIo9gFeQqDYPaZMoPhtdUOFUi5B0aFUJlCy4DG5CEV7zESB4re1YfVKuQxF90oTBUoDeEwcoGTcY+ICRXtMmUCxd9cTBIrf1hmh5AiU2lB6Fd+vpbtzYxVf26Lce8rXxVPq2kZSa4Hit3GkLwRKXTtLGkP6XqDUWmd8lqYKJh+g3MAnT/++mAqYfIDiNe6JnrsXmHyDwnYLHnNQoKThMfkKhe0mPOYHgWL3mIP3A6Ukpr3TC6Qf63vtU0k6hcYqW8YXeI+QHsqwx5Ti3FKGot/wWAll2xaS3g/BY0rTCZ9zEXP5v0M67p+pekoj5d4D5YIUZhnGbbj6wDAzSRXKBJVHlu9dskARKAJFoDQIlNYxP8cH6tMl84vVrVQ9pgJyoMJ5iuP3+kBJSMBImyJQBIpAESgCRaAIFIEiUOIKZSxpPmlIkvS9SLOV+w5x0K3M55V9DSSekig1tvGtzmdJbyj3cc+OSfLmBbAKk5TrQWMbLxHrfdu+C45hXiyOVMarxQylEy6aPiINJX1G2mrJmBeGOUAaody3KP5R7iSSaZxmh2X7N8q/PhPD20eaodwH934hTbHsy3ny+k5vBkDZRvrO2MaLZL3m+V2AYwzzbNsNR7htQvkWUDqC+OOkTUYG05S7hFAv1EA35c7/7Ce1NNLyurV9kVZbP+UuFvWzkZbfiOc53fGoRc5jKam5kY4vWnnhq1cCoPxK6k6a69nGk2Y3PL+PkZaQvsLvvhADrzGhtEGh9R9VpO1Gpjzx9LFyV8LS9i7pP+V//LsSJ7/as205asl2Gc+3LC558tZhpe1J5c738kl3IA0OOMYihLb2hFvKP5M5DXBnokwfory+NuV8CvdSCuHayuIVnYxtDyO8ilBAXhu7GgV6zEhbjby5BjegMhah4NpmIzQqEX4zLOXgPDciv69JxaQzAe0eLzK8AE4wJ+h+SluEwKUkUK7Cvc22pgepwtjWFCf1Oukn1BaH0v/KfxdMe8RNtFHDSbuMNKMAhCfkeuJYRUZF1iCkNyv3SchDpL/gybZQO452KLD3+QPtiu4x2FWnGunmoJEb5DkZ/RhmhaVFfwKexeF2WLnrr3Bb1cRI2wS90ntoYE0gU1XtqoXcIM9C5S2w5FmM72MAiXu1CwHnXZ2k97z7R2+47WFkyDP66410fOLt0KJXAQrv+xS8yGv/er53M/4za64GXtUetWdaORpeL6x5yl2q/gNPO3hF1X3cvI9yl2lsHnDe1+CdVrsjwACbx/6WlTsszwAAAABJRU5ErkJggg==" alt="image"/>
            </a>
            </div>
            <div className="partner-item">
            <a href="/">
            <img src="data:image/png;base64,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" alt="image"/>
            </a>
            </div>
        </div>
    </div>
   
</div>
    )
}

export default OurPartners;