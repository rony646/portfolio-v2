import Head from 'next/head';
import Image from 'next/image';

import profileImage from '../assets/profile.jpg';
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
                    <h1>{"<"}HI, I’M RONY A FRONTEND DEVELOPER FROM BRAZIL {"/>"} </h1>
                    <p>
                        Welcome to my website, my name is Rony and I&apos;m a Frotend Developer from Brazil that loves technology and coding. Actually I&apos;m working as Software Developer Intern using React.js, Typescript, material-ui, styled components and also using Figma for prototyping.
                    </p>
                </Profile>
                <Info>
                    <h2>Work Experience</h2>
                    <ul>
                        <li>
                            <InfoCard>
                               <h1>Software Developer Intern | Mundiale</h1>
                               <span>Belo Horizonte - MG, Brazil</span>
                               <h3>Feb, 2021 - Current</h3>
                               <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in magna elementum, mollis arcu sed, finibus justo. Nunc molestie ipsum velit. Aenean cursus ex dolor, in suscipit orci ullamcorper eget. In ornare lacus sapien, laoreet sagittis ante euismod id. Aenean in iaculis leo.
                               </p>
                            </InfoCard>
                        </li>

                        <li>
                            <InfoCard>
                               <h1>Service Desk Intern | Stefanini Group</h1>
                               <span>Belo Horizonte - MG, Brazil</span>
                               <h3>Aug, 2021 - Feb, 2021</h3>
                               <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in magna elementum, mollis arcu sed, finibus justo. Nunc molestie ipsum velit. Aenean cursus ex dolor, in suscipit orci ullamcorper eget. In ornare lacus sapien, laoreet sagittis ante euismod id. Aenean in iaculis leo.
                               </p>
                            </InfoCard>
                        </li>
                        
                    </ul>

                    <h2>Projects</h2>
                    <ul>
                        <li>
                            <InfoCard>
                                Project 1
                            </InfoCard>
                        </li>
                        
                        <li>
                            <InfoCard>
                                Project 2
                            </InfoCard>
                        </li>

                        <li>
                            <InfoCard>
                                Project 3
                            </InfoCard>
                        </li>

                    </ul>
                </Info>
            </Container>
        </>
    )
};