'use client';

import { PieChart } from '@mui/x-charts/PieChart';
import type { PieChartProps } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts/ChartsLegend';

const otherProps: Partial<PieChartProps> = {
    width: 200,
    height: 300,
    sx: {
        [`.${legendClasses.root}`]: {
            transform: 'translate(20px, 0)',
        },
    },
};

const data = [
    { team: 'Age 10-25', rank: 3, points: 31 },
    { team: 'Age 25-40', rank: 1, points: 50 },
    { team: 'Age 40-60', rank: 4, points: 18 },
    { team: 'Age 60+', rank: 2, points: 37 },
];

export default function SeriesFormatter() {
    return (
        <div className='bg-white relative'>
            <p className="text-center font-bold  absolute top-3 left-[180px]">Age Distribution</p>
            <PieChart
                series={[
                    {
                        data: data.map((d) => ({ label: d.team, id: d.team, value: d.points })),
                        valueFormatter: (v, { dataIndex }) => {
                            const { rank } = data[dataIndex];
                            return `has ${v.value} points and is ranked ${rank}.`;
                        },
                    },
                ]}
                {...otherProps}
            />
        </div>
    );
}
