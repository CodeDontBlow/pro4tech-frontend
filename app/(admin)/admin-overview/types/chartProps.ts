export interface ChartProps {
    period: string[],
    values: number[],
    dataName?: string,
    chartTitle?: string,
    width?: string | number
    height?: string | number
    colors: string[]
}