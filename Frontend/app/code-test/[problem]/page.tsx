"use client";

import React, { useState, useEffect } from "react";

import Editor from "@monaco-editor/react";
import Loading from "../../components/Loading/Loading";

import {
    twoSum,
    twoSumProblem,
    mergeTwoSortedLists,
    mergeTwoSortedListsProblem,
} from "./example";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import Resizable from "react-resizable-box";
import {
    BsFillSunFill,
    BsFillMoonFill,
    BsFullscreen,
    BsFullscreenExit,
    BsArrowReturnRight,
} from "react-icons/bs";

import { Badge } from "@/components/ui/badge";

const frameworks = [
    {
        value: "c++",
        label: "C++",
    },
    {
        value: "java",
        label: "Java",
    },
    {
        value: "javascript",
        label: "Javascript",
    },
    {
        value: "python",
        label: "Python",
    },
];

export default function Page({ params }: { params: { problem: string } }) {
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("javascript");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("c++");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [example, setExample] = useState({});
    const [problem, setProblem] = useState({});

    useEffect(() => {
        if (params && params.problem) {
            console.log(params.problem);
            if (params.problem == "two-sum") {
                setExample(twoSum);
                setProblem(twoSumProblem);
            }
            if (params.problem == "merge-two-sorted-lists") {
                setExample(mergeTwoSortedLists);
                setProblem(mergeTwoSortedListsProblem);
            }
        } else {
            setExample(twoSum);
            setProblem(twoSumProblem);
        }
    }, []);

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "vs-dark" : "light");
    }

    function toggleLanguage() {
        setLanguage(language === "javascript" ? "python" : "javascript");
    }

    // Toggle full screen
    const toggleFullScreen = () => {
        const element = document.documentElement;

        if (!isFullScreen) {
            if ((element as any).requestFullscreen) {
                (element as any).requestFullscreen();
            } else if ((element as any).mozRequestFullScreen) {
                (element as any).mozRequestFullScreen();
            } else if ((element as any).webkitRequestFullscreen) {
                (element as any).webkitRequestFullscreen();
            } else if ((element as any).msRequestFullscreen) {
                (element as any).msRequestFullscreen();
            }
        } else {
            if ((document as any).exitFullscreen) {
                (document as any).exitFullscreen();
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

    return (
        params &&
        params.problem && (
            <div
                className={
                    theme == "light"
                        ? "flex h-screen"
                        : "flex h-screen bg-zinc-800"
                }
                style={{ overflow: "hidden" }}
            >
                {/* Left Section - Problem Statement */}
                <Resizable
                    className={
                        theme == "light"
                            ? "w-2/5 h-auto p-4 border-r overflow-y-scroll overflow-x-hidden"
                            : "w-2/5 h-auto p-4 border-r text-white overflow-y-scroll overflow-x-hidden"
                    }
                    width={550}
                >
                    <div className="flex flex-col justify-start items-start ">
                        <h3
                            className={
                                theme == "light"
                                    ? "text-2xl font-bold mb-4 shadow-sm text-center"
                                    : "text-2xl font-bold mb-4 text-white shadow-sm text-center"
                            }
                        >
                            Problem Statement
                        </h3>
                        <ProblemStatement problem={problem} theme={theme} />
                    </div>
                </Resizable>

                {/* Right Section - Code Editor and Test Cases */}
                <div className="w-3/5 flex flex-col">
                    {/* Upper Right Section - Code Editor */}
                    <Resizable className="h-3/5 p-4 border-b" height={300}>
                        <div className="flex flex-col h-full w-full">
                            {/* buttons */}
                            <div className="flex justify-around items-center mb-4 h-6">
                                <button onClick={toggleTheme}>
                                    {theme === "light" ? (
                                        <BsFillMoonFill
                                            className={
                                                theme == "light"
                                                    ? "h-5 w-5 cursor-pointer"
                                                    : "h-5 w-5 cursor-pointer text-gray-300"
                                            }
                                        />
                                    ) : (
                                        <BsFillSunFill
                                            className={
                                                theme == "light"
                                                    ? "h-5 w-5 cursor-pointer"
                                                    : "h-5 w-5 cursor-pointer text-gray-300"
                                            }
                                        />
                                    )}
                                </button>
                                {/* <button onClick={toggleLanguage}>Language</button> */}
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <div
                                            // variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className={
                                                theme == "light"
                                                    ? "w-[200px] justify-between p-1 border rounded flex items-center"
                                                    : "w-[200px] justify-between p-1 border rounded flex items-center bg-gray-300"
                                            }
                                        >
                                            {value
                                                ? frameworks.find(
                                                      (framework) =>
                                                          framework.value ===
                                                          value
                                                  )?.label
                                                : "Select langauge..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search framework..." />
                                            <CommandEmpty>
                                                No framework found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {frameworks.map((framework) => (
                                                    <CommandItem
                                                        key={framework.value}
                                                        onSelect={(
                                                            currentValue
                                                        ) => {
                                                            setValue(
                                                                currentValue ===
                                                                    value
                                                                    ? ""
                                                                    : currentValue
                                                            );
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value ===
                                                                    framework.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {framework.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <button onClick={toggleFullScreen}>
                                    {isFullScreen ? (
                                        <BsFullscreenExit
                                            className={
                                                theme == "light"
                                                    ? "h-5 w-5 cursor-pointer"
                                                    : "h-5 w-5 cursor-pointer text-gray-300"
                                            }
                                        />
                                    ) : (
                                        <BsFullscreen
                                            className={
                                                theme == "light"
                                                    ? "h-5 w-5 cursor-pointer"
                                                    : "h-5 w-5 cursor-pointer text-gray-300"
                                            }
                                        />
                                    )}
                                </button>
                            </div>
                            {/* code editor */}
                            <Editor
                                height="100%"
                                width="100%"
                                theme={theme}
                                language={value}
                                // @ts-ignore
                                loading={<Loading />}
                                // @ts-ignore
                                value={example[value]}
                                // @ts-ignore
                                editorDidMount={handleEditorDidMount}
                                className="h-full w-full"
                            />
                        </div>
                    </Resizable>

                    {/* Lower Right Section - Test Cases */}
                    <Resizable className="h-2/5 p-4">
                        <div className={theme == "light" ? "" : ""}>
                            <h3
                                className={
                                    theme == "light"
                                        ? "text-2xl font-bold mb-4 shadow-sm text-left"
                                        : "text-2xl font-bold mb-4 text-white shadow-sm text-left"
                                }
                            >
                                Test Cases
                            </h3>
                        </div>
                    </Resizable>
                </div>
            </div>
        )
    );
}

interface Problem {
    title: string;
    difficulty: string;
    description: string;
    examples: {
        input: any;
        output: any;
    }[];
    constraints?: string[];
}

type Props = {
    problem: Problem;
    theme: string;
};
const ProblemStatement = ({ problem, theme }: Props) => {
    return (
        <div className="w-full gap-2 flex flex-col justify-start items-start">
            <h2 className="text-2xl font-semibold">{problem.title}</h2>
            {/* <p className="text-gray-600">Difficulty: {problem.difficulty}</p> */}
            <div
                className={
                    problem.difficulty == "Hard"
                        ? "bg-red-400 text-black p-1 px-2 rounded-full hover:bg-red-500 w-fit"
                        : problem.difficulty == "Medium"
                        ? "bg-yellow-300 text-black p-1 px-2 rounded-full hover:bg-yellow-400 w-fit"
                        : "bg-green-500 text-black p-1 px-2 rounded-full hover:bg-green-600 w-fit"
                }
            >
                {problem.difficulty == "Hard"
                    ? "Hard"
                    : problem.difficulty == "Medium"
                    ? "Medium"
                    : "Easy"}
            </div>
            <p className={theme == "light" ? "text-gray-800" : "text-gray-300"}>
                {problem.description}
            </p>

            {/* Examples */}
            {problem?.examples?.map((example, index) => (
                <div
                    className={
                        theme == "light"
                            ? "bg-gray-300 w-full p-2 rounded-md shadow-md"
                            : "bg-gray-600 w-full p-2 rounded-md shadow-md"
                    }
                >
                    <h2 className="text-lg font-semibold my-1">
                        Example {index + 1}:
                    </h2>
                    <p>
                        <b>Input:</b> {example.input}
                    </p>
                    {/* <p>Input: {JSON.stringify(example.input)}</p>
                    <p>Output: {JSON.stringify(example.output)}</p> */}
                    <p>
                        <b>Output:</b> {example.output}
                    </p>
                </div>
            ))}

            {/* Constraints */}
            {problem?.constraints?.length > 0 && (
                <div className="w-full">
                    <h2 className="text-lg font-semibold my-2">Constraints:</h2>
                    <ul>
                        {problem.constraints.map((constraint) => (
                            <li className="flex justify-start items-start gap-2">
                                <b>
                                    <BsArrowReturnRight className="mr-2" />
                                </b>
                                <span>{constraint}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// const problem = {
//     title: "Constrained Subsequence Sum",
//     difficulty: "Hard",
//     description:
//         "Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence]",
//     examples: [
//         {
//             input: [10, 2, -10, 5, 20],
//             output: 37,
//         },
//         {
//             input: [10, 2, -10, 5, 20],
//             output: 37,
//         },
//         {
//             input: [10, 2, -10, 5, 20],
//             output: 37,
//         },
//     ],
// };
