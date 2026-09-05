"use client"

import { ScaleLogarithmic } from '@mui/x-charts-vendor/d3-scale';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

const otherSetting = {
    height: 300,
    grid: { horizontal: true, vertical: true },
};

// https://en.wikipedia.org/wiki/Low-pass_filter
const f0 = 440;
const frequencyResponse = (f: number) => 5 / Math.sqrt(1 + (f / f0) ** 2);

const dataset = [
    0.1, 0.5, 0.8, 1, 5, 8, 10, 50, 80, 100, 500, 800, 1_000, 5_000, 8_000, 10_000,
    50_000, 80_000, 100_000, 500_000, 800_000, 1_000_000,
].map((f) => ({ frequency: f, Revenue: frequencyResponse(f) }));

export default function Scale() {
    return (
        <div className='bg-white'>
            <LineChart
                dataset={dataset}
                xAxis={[
                    {
                        scaleType: 'log',
                        label: 'Revenue',
                        dataKey: 'frequency',
                        tickNumber: 20,
                        valueFormatter: (f, context) => {
                            if (context.location === 'tick') {
                                const d3Text = (
                                    context.scale as ScaleLogarithmic<number, number, never>
                                ).tickFormat(
                                    context.tickNumber!,
                                    'e',
                                )(f);

                                return d3Text;
                            }
                            return `${f.toLocaleString()}Revenue`;
                        },
                    },
                ]}
                yAxis={[
                    {
                        scaleType: 'log',
                        label: 'Targets',
                        width: 60,
                        valueFormatter: (f, context) => {
                            if (context.location === 'tick') {
                                const d3Text = (
                                    context.scale as ScaleLogarithmic<number, number, never>
                                ).tickFormat(
                                    30,
                                    'f',
                                )(f);

                                return d3Text;
                            }
                            return f.toLocaleString();
                        },
                    },
                ]}
                series={[{ dataKey: 'Revenue' }]}
                {...otherSetting}
            >
                <ChartsReferenceLine x={f0} />
            </LineChart>
        </div>
    );
}
