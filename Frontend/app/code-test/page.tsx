"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Navbar from "../components/Navbar/Navbar";

const problems = [
    {
        no: "001",
        title: "Two Sum",
        difficulty: "Easy",
        slug: "two-sum",
    },
    {
        no: "002",
        title: "Add Two Numbers",
        difficulty: "Medium",
        slug: "add-two-numbers",
    },
    {
        no: "003",
        title: "Merge Two Sorted Lists",
        difficulty: "Medium",
        slug: "merge-two-sorted-lists",
    },
    {
        no: "004",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        slug: "remove-nth-node-from-end-of-list",
    },
    {
        no: "005",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        slug: "longest-substring-without-repeating-characters",
    },
    {
        no: "006",
        title: "ZigZag Conversion",
        difficulty: "Medium",
        slug: "zigzag-conversion",
    },
    {
        no: "007",
        title: "Reverse Integer",
        difficulty: "Easy",
        slug: "reverse-integer",
    },
    {
        no: "008",
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        slug: "string-to-integer-atoi",
    },
    {
        no: "009",
        title: "Palindrome Number",
        difficulty: "Easy",
        slug: "palindrome-number",
    },
    {
        no: "010",
        title: "Regular Expression Matching",
        difficulty: "Hard",
        slug: "regular-expression-matching",
    },
    {
        no: "011",
        title: "Container With Most Water",
        difficulty: "Medium",
        slug: "container-with-most-water",
    },
    {
        no: "012",
        title: "Integer to Roman",
        difficulty: "Medium",
        slug: "integer-to-roman",
    },
    {
        no: "013",
        title: "Roman to Integer",
        difficulty: "Easy",
        slug: "roman-to-integer",
    },
    {
        no: "014",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        slug: "longest-common-prefix",
    },
    {
        no: "015",
        title: "3Sum",
        difficulty: "Medium",
        slug: "3sum",
    },
    {
        no: "016",
        title: "3Sum Closest",
        difficulty: "Medium",
        slug: "3sum-closest",
    },
    {
        no: "017",
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        slug: "letter-combinations-of-a-phone",
    },
];

const TableContent = () => {
    return (
        <div className="banner-image mt-20">
            <Navbar />
            <main>
                <div className="px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl pt-18 sm:pt-24 pb-20 w-full flex justify-center items-center">
                        <div className="flex justify-center w-[80vw] md:w-[60vw] items-center">
                            <Table className="bg-gray-200 bg-opacity-70">
                                <TableCaption>
                                    A list of all the problems you can solve.
                                </TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Prolem No.</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Difficulty</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {problems.map((problem) => (
                                        <TableRow key={problem.no}>
                                            <TableCell className="font-medium">
                                                {problem.no}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/code-test/${problem.slug}`}
                                                >
                                                    {problem.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={
                                                        problem.difficulty ===
                                                        "Hard"
                                                            ? "bg-red-400 text-black p-1 px-2 rounded-full hover:bg-red-500 w-fit text-center"
                                                            : problem.difficulty ===
                                                              "Medium"
                                                            ? "bg-yellow-300 text-black p-1 px-2 rounded-full hover:bg-yellow-400 w-fit text-center"
                                                            : "bg-green-500 text-black p-1 px-2 rounded-full hover:bg-green-600 w-fit text-center"
                                                    }
                                                >
                                                    {problem.difficulty}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TableContent;
