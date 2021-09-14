import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10rem;
    @media(max-width: 768px) {
        flex-direction: column;
        padding: 0 2rem;
    }

   
`

export const Profile = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    flex: 1;
    width: 50%;
    position: fixed;

    h1 {
        color: red;
        width: 56%;
        font-size: 1.75rem;
        background: linear-gradient(to right, #088699, #c5dfe3 65%);
        font-weight: 700;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 1em 0 1rem 0;
        @media(max-width: 768px) {
            flex-direction: column;
            width: 100%;
        }
    }

    p {
        width: 60%;
        text-align: left;
        font-size: 1rem;
        line-height: 1.6rem;
        @media(max-width: 768px) {
            flex-direction: column;
            width: 100%;
        }
    }

    .social-links {
        display: flex;
        justify-content: space-between;
        width: 7rem;
        list-style: none;
        padding: 0;
        li {
            display: inline;
        }
    }

    @media(max-width: 768px) {
        margin-top: 2rem;
        position: relative;
        width: 100%;
    }
`

export const Info = styled.section`
    position: relative;
    margin-top: 3rem;
    /* flex: 1; */
    width: 50%;
    left: 50%;
    .card-list {
        list-style: none;
        padding: 0;

        li {
            margin: 3rem 0;

            a {
                text-decoration: none; 
                color: inherit
            }
        }
    }
    @media(max-width: 768px) {
        position: relative;
        width: 100%;
        left: 0;
    }

    h2 {
        background: linear-gradient(to right, #088699, #c5dfe3 38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
    }
`

export const ProfilePicContainer = styled.div`
    height: 12.5rem;
    width: 12.5rem;
    img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
`

export const InfoCard = styled.article`
    background: #242323;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 0.2rem 2.5rem;
    padding-bottom: 2.3rem;
    height: auto;
    width: 100%;

    &:hover {
        background: #363535;
        transition: background 0.5s;
        cursor: pointer;
    }

    h1 {
        font-weight: 500;
        background: linear-gradient(to right, #088699, #c5dfe3 38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    span {
        font-size: 0.9rem;
    }

    .techs-list {
        margin-top: 1%;
        list-style: initial;

        li {
            margin: 0;
        }
    }

    @media(max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 23rem;
        width: 100%;
    }
`