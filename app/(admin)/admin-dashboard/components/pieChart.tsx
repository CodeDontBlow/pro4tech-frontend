'use client'

import Chart from "react-apexcharts"
import {useState , useEffect} from 'react'
import { ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

const PieChart = ({period , values , dataName, chartTitle, width, height, colors}: ChartProps) => {

    const [options] = useState<ApexOptions>(
        {
            colors,
            chart:{
                type: "donut",
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

            labels: period,
        }
    )

    const [series] = useState( values.map(Number) )

    return(
        <div className="componentWrapper">
            <Chart
                options = {options}
                series = {series}
                width={width}
                height={height}
                type = "donut"
            />
        </div>
    )
}

export default PieChart