'use client'

import Chart from "react-apexcharts"
import { useMemo } from 'react'
import { ApexOptions } from "apexcharts";
import { ChartProps } from "../types/chartProps";

interface PieChartProps extends ChartProps {
    filled?: boolean,
}

const PieChart = ({ period, values, dataName, chartTitle, width, height, colors, filled = true }: PieChartProps) => {

    // 1. Converte os valores para números primeiro
    const series = useMemo(() => values.map(Number), [values]);

    // 2. Monta as opções do gráfico dinamicamente
    const options = useMemo<ApexOptions>(() => ({
        colors,
        chart: {
            type: filled ? "pie" : "donut",
            animations: {
                enabled: true,
                speed: 500,
            },
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        theme: {
            monochrome: {
                enabled: colors?.length === 1,
            }
        },
        title: {
            text: chartTitle,
            style: {
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'IBM Plex Sans, sans-serif',
            }
        },
        labels: period, 
        // Ajuste opcional para a legenda não quebrar o layout compacto de 320px
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
        }
    }), [colors, filled, chartTitle, period]);

    // 🛡️ PROTEÇÃO: Se o array de dados estiver vazio, não renderiza o ApexCharts incompleto.
    // Isso evita que ele quebre na primeira piscada de carregamento da página.
    if (!series || series.length === 0 || series.every(v => v === 0)) {
        return (
            <div 
                style={{ width: width || "100%", height: height || 320 }} 
                className="flex items-center justify-center text-sm text-gray-400 font-medium"
            >
                Carregando avaliações...
            </div>
        );
    }

    return (
        <Chart
            options={options}
            series={series}
            width={width || "100%"}
            height={height || 320}
            type={filled ? "pie" : "donut"}
        />
    )
}

export default PieChart;