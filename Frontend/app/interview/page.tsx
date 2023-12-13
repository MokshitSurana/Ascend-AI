"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar/index";

import { TbBrandPython, TbBrandCpp } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import {
    BiLogoJavascript,
    BiLogoWindows,
    BiLogoCPlusPlus,
} from "react-icons/bi";
import {
    BsFillDatabaseFill,
    BsFillHddNetworkFill,
    BsPersonCheck,
    BsPersonVideo3,
} from "react-icons/bs";
import { PiTreeStructureBold } from "react-icons/pi";
import { MdDataObject } from "react-icons/md";

import {
    behaviouralQuestions,
    dbmsQuestions,
    dataStructures,
    cnQuestions,
    osQuestions,
    hrQuestions,
    oopsQuestions,
    pythonQuestions,
    cppQuestions,
    javaQuestions,
    jsQuestions,
} from "@/data";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import TypewriterText from "@/components/typewritter";
import { toast, ToastContainer } from "react-toastify";
import { ReactMic } from "react-mic";

function VideoCapture() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [showAns, setShowAns] = useState(false);
    const [showNext, setShowNext] = useState(false);

    const [isFullScreen, setIsFullScreen] = useState(false);

    const [capturing, setCapturing] = useState(false);
    const [interviewType, setInterviewType] = useState("hr");

    const [question, setQuestion] = useState(
        interviewType === "hr"
            ? hrQuestions
            : interviewType === "behavioural"
            ? behaviouralQuestions
            : interviewType === "cpp"
            ? cppQuestions
            : interviewType === "java"
            ? javaQuestions
            : interviewType === "python"
            ? pythonQuestions
            : interviewType === "js"
            ? jsQuestions
            : interviewType === "os"
            ? osQuestions
            : interviewType === "dsa"
            ? dataStructures
            : interviewType === "oops"
            ? oopsQuestions
            : interviewType === "cn"
            ? cnQuestions
            : dbmsQuestions
    );

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
    const [speechSynthesis, setSpeechSynthesis] = useState(null);

    const questions = Object.keys(question);
    const answers = Object.values(question);

    const [record, setRecord] = useState(false);

    const startRecording = () => {
        setRecord(true);
    };

    const stopRecording = () => {
        setRecord(false);
    };

    const onData = (recordedBlob: any) => {
        console.log("chunk of real-time data is: ", recordedBlob);
    };

    const onStop = async (recordedBlob: any) => {
        console.log("recordedBlob is: ", recordedBlob);
        console.log("recordedBlob is: ", recordedBlob.blobURL);
        console.log("recordedBlob is: ", recordedBlob.blob);

        // send blob to backend

        // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analyze_audio`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         redirect: "follow",
        //     },
        //     body: JSON.stringify({ audio_blob: JSON.stringify(recordedBlob.blob) }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         return data;
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // const formData = new FormData();
        // formData.append("audio_blob", recordedBlob.blob, "audio.wav");

        // Send the formData to the backend
        // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analyze_audio`, {
        //     method: "POST",
        //     body: formData,
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         return data;
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    // Initialize the SpeechSynthesis API
    useEffect(() => {
        // @ts-ignore
        if ("speechSynthesis" in window) {
            // @ts-ignore
            setSpeechSynthesis(window.speechSynthesis);
        }
    }, []);

    // Update the questions when the interview type changes
    useEffect(() => {
        console.log("interviewType", interviewType);
        console.log("question", question);
        setQuestion(
            interviewType === "hr"
                ? hrQuestions
                : interviewType === "behavioural"
                ? behaviouralQuestions
                : interviewType === "cpp"
                ? cppQuestions
                : interviewType === "java"
                ? javaQuestions
                : interviewType === "python"
                ? pythonQuestions
                : interviewType === "js"
                ? jsQuestions
                : interviewType === "os"
                ? osQuestions
                : interviewType === "dsa"
                ? dataStructures
                : interviewType === "oops"
                ? oopsQuestions
                : interviewType === "cn"
                ? cnQuestions
                : dbmsQuestions
        );
        toast.success(`Interview type set to ${interviewType}!`);
    }, [interviewType]);

    // Capture and send a frame every second
    useEffect(() => {
        let interval: NodeJS.Timeout | any = null;

        if (capturing) {
            interval = setInterval(() => {
                captureAndSendFrame();
                // console.log("capturing");
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [capturing]);

    // Start the interview - toggle full screen, read the first question and start capturing
    const startInterview = async () => {
        toggleFullScreen();
        // if (questions.length > 0) {
        //     setCurrentQuestionIndex(0);
        //     setTimeout(() => {
        //         speakQuestion(questions[0]); // Read the first question
        //     }, 2000);
        //     // speakQuestion(questions[0]);
        // }

        setShowNext(true);
        startRecording();

        // code to start webcam and capture frames
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCapturing(true);
            }
        } catch (error) {
            toast.error("Error accessing webcam!");
            console.error("Error accessing webcam:", error);
        }
    };

    // Stop the interview - stop capturing, reset the interview type and current question index
    const stopInterview = () => {
        if (videoRef.current) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();

            tracks.forEach((track) => {
                track.stop();
            });

            videoRef.current.srcObject = null;
        }

        setCapturing(false);
        setInterviewType("");
        setCurrentQuestionIndex(0);
        setShowAns(false);
        setShowNext(false);
        toggleFullScreen();
        stopRecording();

        toast.success("Interview completed successfully!");
        toast.info("You can now view your performance in the dashboard.");
    };

    // Capture a frame and send it to the backend
    const captureAndSendFrame = () => {
        if (capturing) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            if (video && canvas) {
                const context = canvas.getContext("2d");
                if (!context) {
                    return;
                }
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const image_base64 = canvas.toDataURL();

                // Send the frame data to the FastAPI backend
                try {
                    // const params = new URLSearchParams({
                    //     image_base64,
                    // });
                    fetch(
                        // `${process.env.NEXT_PUBLIC_BACKEND_URL}/get_image?${params}`,
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get_image`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                redirect: "follow",
                            },
                            body: JSON.stringify({ image_base64 }),
                        }
                    );
                } catch (error) {
                    if (error == "No face detected") {
                        toast.warn("No face detected!");
                    }
                    if (error == "More than one face detected") {
                        toast.warn("Multiple faces detected!");
                    }

                    toast.error("Error sending frame data!");
                    toast.info(
                        "Either the backend is down or you are offline."
                    );
                    console.error("Error sending frame data:", error);
                }
            }
        }
    };

    // Toggle full screen
    const toggleFullScreen = () => {
        const element = document.documentElement; // The element you want to make full screen (usually the whole document)

        if (!isFullScreen) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if ((element as any).mozRequestFullScreen) {
                (element as any).mozRequestFullScreen();
            } else if ((element as any).webkitRequestFullscreen) {
                (element as any).webkitRequestFullscreen();
            } else if ((element as any).msRequestFullscreen) {
                (element as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        }

        setIsFullScreen(!isFullScreen);
    };

    // Show the answer to the current question
    const handleShowAnswer = () => {
        // Add your logic here to handle displaying the answer
        setShowAns(true);
    };

    // Read the question using the SpeechSynthesis API
    const speakQuestion = (question: string) => {
        if (typeof speechSynthesis != "undefined" && speechSynthesis != null) {
            // const question = questions[currentQuestionIndex];
            const utterance = new SpeechSynthesisUtterance(question);
            // @ts-ignore
            speechSynthesis.speak(utterance);
            setShowNext(true);
            console.log(
                "currentQuestionIndex - after speak",
                currentQuestionIndex
            );
        }
    };

    // Read the next question
    const handleNextQuestion = () => {
        setShowAns(false);
        if (currentQuestionIndex < questions.length - 1) {
            console.log(
                "currentQuestionIndex - before speak",
                currentQuestionIndex
            );
            if (currentQuestionIndex === 0) {
                setCurrentQuestionIndex(1);
            } else setCurrentQuestionIndex(currentQuestionIndex + 1);
            // Delay reading the question by 2 seconds
            setShowNext(false);
            console.log(
                "currentQuestionIndex - after change",
                currentQuestionIndex
            );
            // setCurrentQuestionIndex(currentQuestionIndex + 2);
            setTimeout(() => {
                speakQuestion(questions[currentQuestionIndex]); // Read the next question
            }, 2000);
            console.log(
                "currentQuestionIndex - afterspeak 2",
                currentQuestionIndex
            );
            setShowNext(true);
        }
        // if (currentQuestionIndex < questions.length - 1) {
        // setCurrentQuestionIndex(currentQuestionIndex + 1);
        // }
        else {
            // Handle end of questions
            setShowNext(false);
        }
    };

    return (
        <main className="">
            {/* navbar */}
            <Navbar />

            {/* main content */}
            <div className="banner-image">
                {/* dialog to choose the interview type */}
                <div
                    className="flex justify-center items-center"
                    style={{
                        display:
                            capturing || interviewType != "" ? "none" : "flex",
                    }}
                >
                    <Dialog defaultOpen={true}>
                        <DialogTrigger
                            className="p-4 bg-orange-500 text-white hover:bg-orange-600 hover:tracking-wider transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={capturing}
                        >
                            Select Interview Type
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Select the type of interview you want to
                                    master?
                                </DialogTitle>
                                <DialogDescription>
                                    You can select from a range of interview
                                    types like Personality based, Programming
                                    based, CS Fundamentals etc.
                                </DialogDescription>
                            </DialogHeader>

                            <Command className="rounded-lg border shadow-md">
                                {/* <CommandInput placeholder="Type a command or search..." /> */}
                                <CommandList>
                                    {/* <CommandEmpty>
                                        No results found.
                                    </CommandEmpty> */}
                                    <CommandGroup heading="Personality Based">
                                        <hr className="w-full" />
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("hr")
                                            }
                                            style={
                                                interviewType === "hr"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BsPersonCheck className="mr-2 h-4 w-4" />
                                            <span>HR</span>
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("behavioural")
                                            }
                                            style={
                                                interviewType === "behavioural"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BsPersonVideo3 className="mr-2 h-4 w-4" />
                                            <span>Behavioural</span>
                                        </div>
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="Programming Based">
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("cpp")
                                            }
                                            style={
                                                interviewType === "cpp"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BiLogoCPlusPlus className="mr-2 h-4 w-4" />
                                            <span>C++</span>
                                            {/* <CommandShortcut>⌘P</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("java")
                                            }
                                            style={
                                                interviewType === "java"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <FaJava className="mr-2 h-4 w-4" />
                                            <span>Java</span>
                                            {/* <CommandShortcut>⌘B</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("python")
                                            }
                                            style={
                                                interviewType === "python"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <TbBrandPython className="mr-2 h-4 w-4" />
                                            <span>Python</span>
                                            {/* <CommandShortcut>⌘S</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("js")
                                            }
                                            style={
                                                interviewType === "js"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BiLogoJavascript className="mr-2 h-4 w-4" />
                                            <span>Javascript</span>
                                            {/* <CommandShortcut>⌘S</CommandShortcut> */}
                                        </div>
                                    </CommandGroup>

                                    <CommandSeparator />

                                    <CommandGroup heading="CS Fundamentals">
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("os")
                                            }
                                            style={
                                                interviewType === "os"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BiLogoWindows className="mr-2 h-4 w-4" />
                                            <span>Operating System</span>
                                            {/* <CommandShortcut>⌘P</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("dsa")
                                            }
                                            style={
                                                interviewType === "dsa"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <PiTreeStructureBold className="mr-2 h-4 w-4" />
                                            <span>
                                                Data Structures and Algorithms
                                            </span>
                                            {/* <CommandShortcut>⌘B</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("oops")
                                            }
                                            style={
                                                interviewType === "oops"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <MdDataObject className="mr-2 h-4 w-4" />
                                            <span>OOPs Concepts</span>
                                            {/* <CommandShortcut>⌘S</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("cn")
                                            }
                                            style={
                                                interviewType === "cn"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BsFillHddNetworkFill className="mr-2 h-4 w-4" />
                                            <span>Computer Networks</span>
                                            {/* <CommandShortcut>⌘S</CommandShortcut> */}
                                        </div>
                                        <div
                                            className="flex justify-start items-center gap-4 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
                                            onClick={() =>
                                                setInterviewType("dbms")
                                            }
                                            style={
                                                interviewType === "dbms"
                                                    ? {
                                                          backgroundColor:
                                                              "#FBBF24",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <BsFillDatabaseFill className="mr-2 h-4 w-4" />
                                            <span>Database Management</span>
                                            {/* <CommandShortcut>⌘S</CommandShortcut> */}
                                        </div>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* video and other buttons */}
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                    <div className="flex justify-center items-center gap-4 md:h-auto h-screen flex-col md:flex-row">
                        {/* video of the user */}
                        <video
                            className="p-4 bg-gray-200 rounded-lg shadow-md"
                            ref={videoRef}
                            autoPlay={true}
                            style={{ display: capturing ? "block" : "none" }}
                        />

                        {/* container to show and display questions and buttons like show answer and next question */}
                        <div
                            className="p-4 bg-gray-200 rounded-lg shadow-md h-full max-w-md"
                            style={{ display: capturing ? "block" : "none" }}
                        >
                            <div className="flex flex-col justify-center items-center gap-4">
                                <h1 className="text-2xl font-bold">
                                    {questions[currentQuestionIndex - 1]}
                                </h1>
                                {/* <p>{showAns}</p> */}
                                <p>
                                    {showAns && (
                                        <TypewriterText
                                            text={
                                                answers[
                                                    currentQuestionIndex - 1
                                                ]
                                            }
                                        />
                                    )}
                                </p>
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={handleShowAnswer}
                                        className="p-2 bg-blue-500 text-white hover:bg-blue-600 hover:tracking-wider transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Show Answer
                                    </button>
                                    <button
                                        onClick={handleNextQuestion}
                                        className="p-2 bg-green-500 text-white hover:bg-green-600 hover:tracking-wider transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!showNext}
                                    >
                                        Next Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* contains buttons to start and stop the interview */}
                    <div className="flex justify-center items-center gap-8">
                        <button
                            className="p-4 bg-blue-500 text-white hover:bg-blue-600 hover:tracking-wider transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={startInterview}
                            disabled={capturing}
                        >
                            Start Interview
                        </button>

                        <canvas ref={canvasRef} style={{ display: "none" }} />
                        <button
                            className="p-4 bg- text-white bg-red-500 hover:bg-red-600 hover:tracking-wider transition-all duration-300 rounded-lg disabled:opacity-75 disabled:cursor-not-allowed"
                            onClick={stopInterview}
                            disabled={!capturing}
                        >
                            Stop Interview
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden">
                <ReactMic
                    record={record}
                    className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081"
                    mimeType="audio/wav"
                />
                {/* <button onClick={startRecording} type="button">
                    Start
                </button>
                <button onClick={stopRecording} type="button">
                    Stop
                </button> */}
            </div>
        </main>
    );
}

export default VideoCapture;
