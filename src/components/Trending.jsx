import React from "react";
import styled from "styled-components";


export default function Trending() {
    return (
        <Container>
            <Title>
                <h1>trending</h1>
            </Title>
            <TrendingBorder />
            <TrendingHashtags>
                <h2># react</h2>
                <h2># javascript</h2>
                <h2># css</h2>
                <h2># html</h2>
                <h2># python</h2>
                <h2># node</h2>
                <h2># express</h2>
                <h2># mongodb</h2>
                <h2># postgres</h2>
                <h2># sql</h2>
            </TrendingHashtags>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 300px;
    height: 400px;
    border-radius: 16px;
    background-color: #171717;
`;

const Title = styled.div`
    display: flex;
    height: 10%;
    margin: 9px;

    h1 {
        color: #fff;
        font-family: Oswald;
        font-size: 27px;
        font-weight: 700;
        line-height: 40px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 10px;
    }
`;

const TrendingBorder = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;
`;

const TrendingHashtags = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 15px;

    h2 {
        color: #fff;
        font-size: 20px;
        font-family: Lato;
        font-weight: 700;
        line-height: 23px;
        letter-spacing: 0.05em;
        text-align: left;
        margin-bottom: 8px;
    }
`;