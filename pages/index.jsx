import Head from 'next/head';
import Image from 'next/image';

import profileImage from '../assets/profile.jpg';
import linkedInIcon from '../assets/linkedin-icon.png';
import gitHubLogo from '../assets/github-icon-white-github-icon-black-background-symbol-logo-trademark-steering-wheel-transparent-png-842663.png';

import { 
    Container, 
    Profile, 
    Info, 
    ProfilePicContainer,
    InfoCard
} from '../styles/home';

export default function Home() {
    return(
        <>
            <Head>
                <title>Home | Rony Silva</title>
            </Head>
            <Container>
                <Profile>
                    <ProfilePicContainer>
                        <Image
                            src={profileImage}
                            alt="Profile Image"
                        />
                    </ProfilePicContainer>
                    <h1>{"<"}HI, I’M RONY A FRONTEND DEVELOPER FROM BRAZIL{"/>"}</h1>
                    <p>
                        Welcome to my website, my name is Rony and I&apos;m a Frotend Developer from Brazil that loves technology and coding. Actually I&apos;m working as Software Developer Intern using React.js, Typescript, material-ui, styled components and also using Figma for prototyping.
                    </p>

                    <ul className="social-links">
                        <li>
                            <a href="https://www.linkedin.com/in/rony-p-11a738117/" target="_blank" rel="noreferrer">
                                <Image
                                    src={linkedInIcon}
                                    alt="LinkedIn Icon"
                                    height={35}
                                    width={35}
                                />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/rony646" target="_blank" rel="noreferrer">
                                <Image
                                    src={gitHubLogo}
                                    alt="GitHub Icon"
                                    height={35}
                                    width={35}
                                />
                            </a>
                        </li>
                    </ul>
                </Profile>

                <Info>
                    <h2>Work Experience</h2>
                    <ul className="card-list ">
                        <li>
                            
                            <a href="https://www.mundiale.com.br/" target="_blank" rel="noreferrer" >
                                <InfoCard >
                                <h1>Software Developer Intern | Mundiale</h1>
                                <span>Belo Horizonte - MG, Brazil</span>
                                <h3>Feb, 2021 - Current</h3>
                                <p>
                                        Working as a Frontend Software Developer Intern using React.js, TypeScript, Material UI and also creating figma prototypes for Dashboards and other Web Applications.
                                </p>
                                </InfoCard>
                            </a>
                            
                        </li>

                        <li>
                            <a href="https://stefanini.com/pt-br" target="_blank" rel="noreferrer" >
                                <InfoCard>
                                <h1>Service Desk Intern | Stefanini Group</h1>
                                <span>Belo Horizonte - MG, Brazil</span>
                                <h3>Aug, 2021 - Feb, 2021</h3>
                                <p>
                                        Working as a Service Desk intern opening and solving lvl 1 tickets for great clients of the region.
                                </p>
                                </InfoCard>
                            </a>
                        </li>
                        
                    </ul>

                    <h2>Projects</h2>
                    <ul className="card-list">
                        <li>
                            <a href="https://github.com/rony646/food-app" target="_blank" rel="noreferrer" >
                                <InfoCard className>
                                    <h1>Food App</h1>
                                    <strong>Description: </strong>
                                    <p>A React Native mobile app with seven screens where you can search for a meal, add it to the cart and finish your order.</p>
                                    <strong>Techs Used: </strong>
                                    <ul className="techs-list">
                                        <li>React Native</li>
                                        <li>TypeScript</li>
                                        <li>Redux</li>
                                        <li>Styled Components</li>
                                    </ul>
                                </InfoCard>
                            </a>
                        </li>
                        
                        <li>
                            <a href="https://github.com/rony646/weather-app" target="_blank" rel="noreferrer" >
                                <InfoCard>
                                    <h1>Weather App</h1>
                                    <strong>Description: </strong>
                                    <p>A React App created using the Open Weather API where you can search for a location and see the wheather forecast for five days.</p>
                                    <strong>Techs Used: </strong>
                                    <ul className="techs-list">
                                        <li>React</li>
                                        <li>Context API</li>
                                        <li>Axios</li>
                                    </ul>
                                </InfoCard>
                            </a>
                        </li>

                        <li>
                            <a href="https://github.com/rony646/where-in-the-world" target="_blank" rel="noreferrer" >
                                <InfoCard>
                                    <h1>Where in the World</h1>
                                    <strong>Description: </strong>
                                    <p>A React App where you can search for a country and see some info about it.</p>
                                    <strong>Techs Used: </strong>
                                    <ul className="techs-list">
                                        <li>React</li>
                                        <li>React Router</li>
                                        <li>Styled Components</li>
                                    </ul>
                                </InfoCard>
                            </a>
                        </li>

                    </ul>

                    
                </Info>
            </Container>
        </>
    )
};