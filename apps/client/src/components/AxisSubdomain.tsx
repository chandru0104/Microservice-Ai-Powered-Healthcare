"use client"
import * as React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const data = Array.from({ length: 200 }, () => ({
    x: Math.random() * 100 - 25,
    y: Math.random() * 100 - 25,
})).map((d, index) => ({ ...d, id: index }));

const minDistance = 10;

export default function AxisSubdomain() {
    const [value, setValue] = React.useState<number[]>([-25, 25]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue as number[]);
        }
    };

    return (
        <div className='bg-white p-1 relative'>
            <p className="text-center font-bold  absolute top-2 left-[180px]">User Active Status</p>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <ScatterChart
                    xAxis={[
                        {
                            label: 'x',
                            min: value[0],
                            max: value[1],
                        },
                    ]}
                    series={[{ data }]}
                    height={260}
                />
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={-40}
                    max={40}
                />
            </Box>
        </div>
    );
}
