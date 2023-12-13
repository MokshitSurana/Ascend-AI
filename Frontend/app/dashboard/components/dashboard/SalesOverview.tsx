import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
    // select
    const [month, setMonth] = useState("1");
    const [optionscolumnchart, setOptionsColumnChart] = useState<any>({});
    // values from 1 to 6

    const [y, setY] = useState([6, 6, 6, 3, 3, 3, 4, 6, 3, 3, 6, 6, 6, 6, 3]);
    // timestamps
    // i want an array of time strings in locale format for each second starting from the current time
    const [x, setX] = useState(getTimeArray(15));

    // const [x, setX] = useState([new Date().toLocaleTimeString(), ]);

    function getTimeArray(count) {
        const timeArray = [];
        const now = new Date();

        for (let i = 0; i < count; i++) {
            const timeString = now.toLocaleTimeString();
            timeArray.push(timeString);
            now.setSeconds(now.getSeconds() + 1);
        }

        return timeArray;
    }

    const videoMap = {
        1: "Disgust",
        2: "Fear",
        3: "Happy",
        4: "Sad",
        5: "Surprise",
        6: "Neutral",
    };

    const videoMapFunc = (x: number[]) => {
        // loop over the array and map the values to the corresponding strings
        let y: string[] = [];
        x.forEach((element) => {
            y.push(videoMap[element]);
        });
        return y;
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // from the backend i will get a json in which there are two arrays one with time stamps which will be the x axis of the graph and the other array with values or scores which I have to map with the a list of strings which will be the y axis of the graph

    useEffect(() => {
        // fetch the data from the backend
        // set the data to the state

        setOptionsColumnChart({
            chart: {
                type: "bar",
                fontFamily: "'Plus Jakarta Sans', sans-serif;",
                foreColor: "#000",
                toolbar: {
                    show: true,
                },
                height: 370,
            },
            colors: [primary, secondary],
            plotOptions: {
                bar: {
                    horizontal: false,
                    barHeight: "60%",
                    columnWidth: "42%",
                    borderRadius: [6],
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all",
                },
            },
            labels: x,
            stroke: {
                show: true,
                width: 5,
                lineCap: "butt",
                colors: ["transparent"],
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: "top",
                horizontalAlign: "start",
                offsetX: 0,
                offsetY: -10,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    width: 10,
                    height: 10,
                    strokeWidth: 0,
                    strokeColor: "#fff",
                    fillColors: undefined,
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0,
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 10,
                },
            },
            grid: {
                borderColor: "rgba(0,0,0,0.3)",
                strokeDashArray: 3,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            yaxis: {
                // show: false,
                tickAmount: 6,
            },
            xaxis: {
                categories: x,
                axisBorder: {
                    show: false,
                },
            },
            tooltip: {
                theme: theme.palette.mode === "dark" ? "dark" : "light",
                fillSeriesColor: false,
            },
        });

        // const data = fetch(
        //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/video_analyze`,
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         setX(data[1]);
        //         setY(data[0]);
        //         console.log(x);
        //         console.log(y);

        //         // chart
        //         // setOptionsColumnChart({
        //         //     chart: {
        //         //         type: "bar",
        //         //         fontFamily: "'Plus Jakarta Sans', sans-serif;",
        //         //         foreColor: "#000",
        //         //         toolbar: {
        //         //             show: true,
        //         //         },
        //         //         height: 370,
        //         //     },
        //         //     colors: [primary, secondary],
        //         //     plotOptions: {
        //         //         bar: {
        //         //             horizontal: false,
        //         //             barHeight: "60%",
        //         //             columnWidth: "42%",
        //         //             borderRadius: [6],
        //         //             borderRadiusApplication: "end",
        //         //             borderRadiusWhenStacked: "all",
        //         //         },
        //         //     },
        //         //     labels: y,
        //         //     stroke: {
        //         //         show: true,
        //         //         width: 5,
        //         //         lineCap: "butt",
        //         //         colors: ["transparent"],
        //         //     },
        //         //     dataLabels: {
        //         //         enabled: false,
        //         //     },
        //         //     legend: {
        //         //         show: true,
        //         //         position: "top",
        //         //         horizontalAlign: "start",
        //         //         offsetX: 0,
        //         //         offsetY: -10,
        //         //         labels: {
        //         //             useSeriesColors: true,
        //         //         },
        //         //         markers: {
        //         //             width: 10,
        //         //             height: 10,
        //         //             strokeWidth: 0,
        //         //             strokeColor: "#fff",
        //         //             fillColors: undefined,
        //         //             radius: 12,
        //         //             customHTML: undefined,
        //         //             onClick: undefined,
        //         //             offsetX: 0,
        //         //             offsetY: 0,
        //         //         },
        //         //         itemMargin: {
        //         //             horizontal: 15,
        //         //             vertical: 10,
        //         //         },
        //         //     },
        //         //     grid: {
        //         //         borderColor: "rgba(0,0,0,0.3)",
        //         //         strokeDashArray: 3,
        //         //         xaxis: {
        //         //             lines: {
        //         //                 show: false,
        //         //             },
        //         //         },
        //         //     },
        //         //     yaxis: {
        //         //         // show: false,
        //         //         tickAmount: 6,
        //         //     },
        //         //     xaxis: {
        //         //         categories: x,
        //         //         axisBorder: {
        //         //             show: false,
        //         //         },
        //         //     },
        //         //     tooltip: {
        //         //         theme: theme.palette.mode === "dark" ? "dark" : "light",
        //         //         fillSeriesColor: false,
        //         //     },
        //         // });
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error);
        //     });
    }, []);

    const seriescolumnchart: any = [
        // {
        //     name: "Eanings this month",
        //     data: [355, 390, 300, 350, 390, 180, 355, 390],
        // },
        {
            name: "Emotion",
            data: y,
        },
    ];
    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    const [columnChart, setColumnChart] = useState<any>([]);

    return (
        <DashboardCard
            title="Video Analysis"
            action={
                <Select
                    labelId="month-dd"
                    id="month-dd"
                    value={month}
                    size="small"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>March 2023</MenuItem>
                    <MenuItem value={2}>April 2023</MenuItem>
                    <MenuItem value={3}>May 2023</MenuItem>
                </Select>
            }
        >
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
