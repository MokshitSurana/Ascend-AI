import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";

import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";

const YearlyBreakup = () => {
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = "#ecf2ff";
    const successlight = theme.palette.success.light;

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: "donut",
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: "#adb0bb",
            toolbar: {
                show: false,
            },
            height: 155,
        },
        colors: [primary, primarylight, "#F9F9FD"],
        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                donut: {
                    size: "75%",
                    background: "transparent",
                },
            },
        },
        tooltip: {
            theme: theme.palette.mode === "dark" ? "dark" : "light",
            fillSeriesColor: false,
        },
        stroke: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    chart: {
                        width: 120,
                    },
                },
            },
        ],
    };
    const seriescolumnchart: any = [38, 40, 25];

    return (
        // <DashboardCard title="Video Emotion ClassNamees">

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                        Index
                    </th>
                    <th className="px-6 py-3 bg-gray-100 border-b border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                        Emotion
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        1
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <Typography variant="subtitle2">Disgust</Typography>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        2
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <Typography variant="subtitle2">Fear</Typography>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        3
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <Typography variant="subtitle2">Happy</Typography>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        4
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <Typography variant="subtitle2">Sad</Typography>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        5
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <Typography variant="subtitle2">Surprise</Typography>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        6
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <Typography variant="subtitle2">Neutral</Typography>
                    </td>
                </tr>
            </tbody>
        </table>

        // </DashboardCard>
    );
};

export default YearlyBreakup;
