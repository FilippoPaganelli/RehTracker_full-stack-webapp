import React, { useEffect, useState } from 'react';
import { Pie, PieChart } from 'recharts';
import randomColor from 'randomcolor';
import data from './offlineData';

const reactDonutChartInnerRadius = 62.5;
const reactDonutChartOuterRadius = 125;
const rotateAngleToLookBetter = -270;
let amoutOfTimes = '1/3';
const width = 350;
const height = 350;

function ExerChart(props) {
  const number = props.number;
  const [state, setState] = useState();
  const [key, setKey] = useState(1);

  function IncrementFill() {
    const newData = data;
    newData[9].fill = randomColor();
    setState(newData);
    setKey(key + 1);
  }

  useEffect(() => {
    console.log('first data set');
    setState(data);
  }, []);

  return (
    <div>
      <button onClick={IncrementFill}>Click to fill</button>
      <PieChart key={key} width={width} height={height}>
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={30}
        >
          {amoutOfTimes}
        </text>
        <Pie
          animationDuration={700}
          data={state}
          outerRadius={reactDonutChartOuterRadius}
          innerRadius={reactDonutChartInnerRadius}
          startAngle={rotateAngleToLookBetter}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          dataKey="value"
          // label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
          //   const RADIAN = Math.PI / 180;
          //   // eslint-disable-next-line
          //   const radius = 25 + innerRadius + (outerRadius - innerRadius);
          //   // eslint-disable-next-line
          //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
          //   // eslint-disable-next-line
          //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

          //   return (
          //     <text
          //       x={x}
          //       y={y}
          //       textAnchor={x > cx ? 'start' : 'end'}
          //       dominantBaseline="central"
          //     >
          //       {state[index].name}
          //     </text>
          //   );
          // }}
        />
      </PieChart>
    </div>
  );
}

export default ExerChart;
