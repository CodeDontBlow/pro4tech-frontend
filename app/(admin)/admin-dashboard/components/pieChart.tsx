'use client'

import Chart from "react-apexcharts"
import {useState , useEffect} from 'react'
import { ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

interface PieChartProps extends ChartProps {
    filled?: boolean,
}

const PieChart = ({period , values , dataName, chartTitle, width, height, colors, filled = true}: PieChartProps) => {

    const [options] = useState<ApexOptions>(
        {
            colors,
            chart:{
                type: filled ? "pie" : "donut",
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

            theme:{
                monochrome: {
                    enabled: colors.length === 1,
                }
            },

            title:{
                text: chartTitle,
                style: {
                    fontSize: '16px',
                    fontWeight: 600,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                }
            },

            labels: period,
        }
    )

    const [series] = useState( values.map(Number) )

    return(
        <Chart
            options = {options}
            series = {series}
            width={width}
            height={height}
            type = {filled ? "pie" : "donut"}
        />
    )
}

export default PieChart