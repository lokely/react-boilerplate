import React from 'react';
import { Area } from 'salad-ui.chart';

const chartData = [
  {time: new Date('1990-01-02'), value: 1231},
  {time: new Date('1990-02-02'), value: 1411},
  {time: new Date('1990-03-02'), value: 1111},
  {time: new Date('1990-04-02'), value: 1531},
  {time: new Date('1990-05-02'), value: 1419},
];

const Home = () => (
  <div className="Charts">
    <Area
      width={600}
      height={300}
      labelTemplate={data => `Cats ate $${data.value} worth of fish that day.`}
      data={chartData}
    />
  </div>
);

export default Home;
