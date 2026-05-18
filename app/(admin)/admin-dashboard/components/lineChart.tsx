'use client'

import Chart from "react-apexcharts"
import {useState , useEffect} from 'react'
import { ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

const LineChart = ({period , values , dataName, chartTitle, width, height, colors}: ChartProps) => {

    useEffect(() => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        },100);
    }, []);

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
            },

            xaxis: {
                categories: period
            },

            grid: {
                show: true,
                borderColor: "var(--white-700)",
                row: {
                    colors: ["#ffffff25" , "transparent"]
                },
                padding: { left: 15 , right: 0, top: 0, bottom: 0 },
            },
            stroke : {
                curve: "smooth",
                width: 3,
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
        <div className="componentWrapper">
            <Chart
                options = {options}
                series = {series}
                width={width}
                height={height}
                type = "line"
            />
        </div>
    )
}

export default LineChart