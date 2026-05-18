export interface ChartProps {
    period: string[],
    values: string[] | number[],
    dataName?: string,
    chartTitle?: string,
    width?: string | number | '500px'
    height?: string | number | '300px'
    colors: string[]
}