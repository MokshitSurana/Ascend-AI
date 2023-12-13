import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Fab } from "@mui/material";
import {
    IconArrowDownRight,
    IconCurrencyDollar,
    IconWaveSine,
} from "@tabler/icons-react";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";

const MonthlyEarnings = () => {
    // chart color
    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    const secondarylight = "#f5fcff";
    const errorlight = "#fdede8";

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: "area",
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: "#adb0bb",
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: "sparklines",
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        fill: {
            colors: [secondarylight],
            type: "solid",
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: theme.palette.mode === "dark" ? "dark" : "light",
        },
    };
    const seriescolumnchart: any = [
        {
            name: "",
            color: secondary,
            data: [0, 3, 3, 4, 6, 3, 3, 4, 5, 6, 2, 1, 3],
        },
    ];

    const audioMap = {
        0: "Angry",
        1: "Disgust",
        2: "Fear",
        3: "Happy",
        4: "Neutral",
        5: "Sad",
        6: "Surprise",
    };

    return (
        <DashboardCard
            title="Audio Analysis"
            action={
                <Fab color="secondary" size="medium" sx={{ color: "#ffffff" }}>
                    <IconWaveSine width={24} />
                </Fab>
            }
            footer={
                <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="area"
                    height="60px"
                />
            }
        >
            <>
                <Typography variant="h3" fontWeight="700" mt="-20px">
                    Happy
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                    <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
                        <IconArrowDownRight width={20} color="#FA896B" />
                    </Avatar>
                    <Typography variant="subtitle2" fontWeight="600">
                        -2%
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        last interview
                    </Typography>
                </Stack>
            </>
        </DashboardCard>
    );
};

export default MonthlyEarnings;
