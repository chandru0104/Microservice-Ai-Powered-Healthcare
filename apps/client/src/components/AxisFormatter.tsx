'use client';

import { BarChart } from '@mui/x-charts/BarChart';

const otherSetting = {
    height: 255,
    yAxis: [{ label: 'Count of Product', width: 60 }],
    grid: { horizontal: true },
};

const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        products: 21,
        month: 'January',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        products: 28,
        month: 'February',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        products: 41,
        month: 'March',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        products: 73,
        month: 'April',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        products: 99,
        month: 'May',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        products: 144,
        month: 'June',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        products: 319,
        month: 'July',
    },
    {
        london: 65,
        paris: 60,
        newYork: 106,
        products: 249,
        month: 'August',
    },
    {
        london: 51,
        paris: 51,
        newYork: 95,
        products: 131,
        month: 'September',
    },
    {
        london: 60,
        paris: 65,
        newYork: 97,
        products: 55,
        month: 'October',
    },
    {
        london: 67,
        paris: 64,
        newYork: 76,
        products: 48,
        month: 'November',
    },
    {
        london: 61,
        paris: 70,
        newYork: 103,
        products: 25,
        month: 'December',
    },
];

const valueFormatter = (value: number | null) => `${value} Products`;

export default function Formatter() {
    return (
        <div className='bg-white p-2 '>
            <BarChart
                dataset={dataset}
                xAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'month',
                        valueFormatter: (month, context) =>
                            context.location === 'tick'
                                ? `${month.slice(0, 3)} \n2023`
                                : `${month} 2023`,
                        height: 50,
                    },
                ]}
                series={[{ dataKey: 'products', label: 'Orders', valueFormatter }]}
                {...otherSetting}
            />
        </div>
    );
}
