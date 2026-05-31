'use client'

import Chart from "react-apexcharts"
import {useState , useEffect} from 'react'
import { ApexAxisChartSeries, ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

function BarChart({period , values , chartTitle , colors, width, height}: ChartProps){

    const [options] = useState<ApexOptions>(
        {
            colors,
            chart: {
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories: period,
            },
            title: {
                text: chartTitle,                
                style: {
                    fontSize: "16px",
                    fontWeight: 600,
                    fontFamily: 'IBM Plex Sans, sans-serif',
                },
            },

            //Customização das barras
            plotOptions: {
                bar: {
                    barHeight: '90%',
                    horizontal: true,
                    borderRadius: 3,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        position: "top",
                        hideOverflowingLabels: true,
                        maxItems: 3,
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -15,
            },
        }
    )

    const [series] = useState<ApexAxisChartSeries>([
        {
            name: chartTitle,
            data: values
        }
    ])

    //Componente de gráfico do ApexCharts recebendo os valores definidos acima
    return(
        <Chart
            options = {options}
            series = {series}
            width={width}
            height={height}
            type = "bar"
        />
    )
}

export default BarChart