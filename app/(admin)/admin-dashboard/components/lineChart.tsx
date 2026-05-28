'use client'

import Chart from "react-apexcharts"
import { useMemo } from 'react'
import { ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

const LineChart = ({ period, values, dataName, chartTitle, width, height, colors }: ChartProps) => {

    const options = useMemo<ApexOptions>(() => ({
        colors,
        chart: {
            type: "line",
            animations: { enabled: true, speed: 500 },
            zoom: { enabled: false },
            toolbar: { show: false },
        },
        title: {
            text: chartTitle,
            style: {
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'IBM Plex Sans, sans-serif',
            }
        },
        xaxis: {
            categories: period,
            labels: {
                rotate: 0, 
            }
        },
        grid: {
            show: true,
            borderColor: "var(--white-500)",
            row: { colors: ["var(--white-base)", "var(--white-300)"] },
            padding: { left: 15, right: 15, top: 0, bottom: 0 },
        },
        stroke: { curve: "smooth", width: 2 }
    }), [colors, chartTitle, period]);

    const series = useMemo(() => [
        { name: dataName, data: values.map(Number) },
    ], [dataName, values]);

    return (
        
        <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: width || '1200px' }}> 
                <Chart
                    options={options}
                    series={series}
                    width="100%"
                    height={height || 300}
                    type="line"
                />
            </div>
        </div>
    )
}

export default LineChart;