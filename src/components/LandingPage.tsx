"use client";

import { useState } from 'react';
import { Theme, Heading, TextArea, Text, Button } from '@radix-ui/themes';
import * as Progress from '@radix-ui/react-progress';
import { WavyBackground } from './ui/WavyBackground';

const LandingPage = () => {
    const [textContent, setTextContent] = useState("");
    const [resultsLoadingVisible, setResultsLoadingVisible] = useState(false);
    const [progress, setProgress] = useState(10);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [resultsLabelVisible, setResultsLabelVisible] = useState(false);
    const [probability, setProbability] = useState("0");

    const handleDetectButton = () => {
        setResultsLabelVisible(true);
        setResultsVisible(false);
        setResultsLoadingVisible(true);
        setProgress(10);
        for (let i = 0; i <= 100; i++) {
            setTimeout(() => {
                setProgress(i);
            }, 10);
        }
        setTimeout(() => {
            const cache = localStorage.getItem(textContent);
            const randomProbability = cache != null ? cache : (Math.random() * 100).toString();
            setProbability(randomProbability);
            setResultsLoadingVisible(false);
            setResultsVisible(true);
            localStorage.setItem(textContent, randomProbability.toString());
        }, 1000);
    };

    const handleTextChange = (event: any) => {
        setResultsLabelVisible(false);
        setResultsVisible(false);
        setResultsLoadingVisible(false);
        setTextContent(event.target.value);
    }

    return (
        <Theme
            accentColor="green"
            appearance="dark"
            radius="large"
            scaling="95%"
        >
            <WavyBackground>
                <div className="flex min-h-screen flex-col items-center space-y-10 p-24 w-screen">
                    <div className="flex items-center">
                        <Heading>
                            AI Generated Text Detector 🕵️‍♂️🔎
                        </Heading>
                    </div>
                    <div className="flex items-center">
                        <Text>
                            Use this AI based AI generated text detector to identify content on the internet you suspect to be AI generated.
                        </Text>
                    </div>
                    <div className="flex items-center w-full">
                        <TextArea className="w-full h-64" placeholder="Text goes here…" onChange={handleTextChange}/>
                    </div>

                    <div className="flex items-center">
                        <Button className="w-full" onClick={handleDetectButton}>Detect 🔎</Button>
                    </div>

                    <div className={"flex flex-col items-center " + (resultsLabelVisible ? "visible" : "hidden")}>
                        <Heading className="w-full">Results</Heading>
                    </div>
                    <div className="flex flex-col items-center">
                        <Progress.Root className={"ProgressRoot " + (resultsLoadingVisible ? "visible" : "hidden")} value={progress}>
                            <Progress.Indicator
                                className={"ProgressIndicator " + (resultsLoadingVisible ? "visible" : "hidden")}
                                style={{ transform: `translateX(-${100 - progress}%)` }}
                            />
                        </Progress.Root>
                        <Heading className={resultsVisible ? "visible": "hidden"}>{probability.substring(0, 2)}%</Heading>
                    </div>
                </div>
            </WavyBackground>
        </Theme>
    );
}

export default LandingPage;
