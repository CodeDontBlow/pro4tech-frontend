'use client'

import Chart from "react-apexcharts"
import {useState , useEffect} from 'react'
import { ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

const LineChart = ({period , values , dataName, chartTitle, width, height, colors}: ChartProps) => {

    const [options] = useState<ApexOptions>(
        {
            colors,
            chart:{
                type: "line",
                animations: {
                    enabled: true,
                    speed: 500,
                },
                zoom : {
                    enabled: false,
                },
                toolbar : {
                    show: false,
                },
            },

            title:{
                text: chartTitle,
                style: {
                    fontSize: '16px',
                    fontWeight: 600,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                }
            },

            xaxis: {
                categories: period
            },

            grid: {
                show: true,
                borderColor: "var(--white-500)",
                row: {
                    colors: ["var(--white-base)" , "var(--white-300)"],
                },
                padding: { left: 15 , right: 0, top: 0, bottom: 0 },
            },
            stroke : {
                curve: "smooth",
                width: 2,
            }
        }
    )

    const [series] = useState([
        { 
            name:dataName, 
            data: values.map(Number),
        },
    ])

    return(
        <Chart
            options = {options}
            series = {series}
            width={width}
            height={height}
            type = "line"
        />
    )
}

export default LineChart