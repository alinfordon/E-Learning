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
    const [isGALEVisible, setIsGALEVisible] = useState(false);
    const [isNovelVisible, setIsNovelVisible] = useState(false);
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
            <Modal title="A short description of GALE" 
                    className="modalStyle"
                    visible={isGALEVisible} 
                    onOk={() => setIsGALEVisible(false)} 
                    onCancel={() => setIsGALEVisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://www.gale.info"
                          type="link"    
                          target="_blank"                      
                          onClick={() => setIsGALEVisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                      >
                <p>GALE, the Global Alliance for LGBT Education, is a global network of educators who cooperate on the full inclusion of people who are disadvantaged because of their expression of sexual preference or gendered identity by identifying, enhancing and sharing educational expertise.  </p>
                
            </Modal>
            <a onClick={() => setIsGALEVisible(true)}>
            <img className="fake-img" src="/images/logo/GALE-150.jpg" alt="image"/>
            </a>
            </div>
            <div className="partner-item">
            <Modal title="Novel group Sarl is a Consulting Company " 
                    className="modalStyle"
                    visible={isNovelVisible} 
                    onOk={() => setIsNovelVisible(false)} 
                    onCancel={() => setIsNovelVisible(false)}
                    footer={[   
                        <Button
                          key="link"
                          href="https://www.novelgroup.lu/"
                          type="link"    
                          target="_blank"                      
                          onClick={() => setIsNovelVisible(false)}
                        >
                          Read More
                        </Button>,
                      ]}
                      >
                <p>Novel group Sarl is a Consulting Company as well as a Vocational Training Center based in Gasperich, the new business center of Luxembourg. </p>
                <p>Novel group provides an integrated package of vocational training services, promotion to the employment and development of entrepreneurship to European, National and local bodies, as well as to private enterprises and organizations. Indicative sectors are: Finance and Management, Informatics, Tourism, Creative Economy and Agricultural professions. The IT consulting services of Novel group provided in strategy issues support business and enterprise strategy, business reformation and company improvement, organizational design and activity internationalization. </p>
            </Modal>
            <a onClick={() => setIsNovelVisible(true)}>
            <img className="fake-img" src="/images/logo/novel-150.png" alt="image"/>
            </a>
            </div>           
        </div>
    </div>
   
</div>
    )
}

export default OurPartners;