import React, { useContext, useEffect, useState } from 'react';
import { Pie, PieChart } from 'recharts';
import AuthContext from '../../contexts/AuthContext';
import data from './offlineData';

const reactDonutChartInnerRadius = 62.5;
const reactDonutChartOuterRadius = 125;
const rotateAngleToLookBetter = -270;
const width = 350;
const height = 350;

function ExerChart(props) {
  const index = props.index;
  const [incrementableKey, setKey] = useState(index + 1);
  const { stats } = useContext(AuthContext);
  const [repetitions, setRepetitions] = useState();
  const [sets, setSets] = useState({ done: 0, total: 0 });
  const [type, setType] = useState('-');

  useEffect(() => {
    setRepetitions(data);
    setKey(incrementableKey + 1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setKey(incrementableKey + 1);
    setRepetitions(data);
    const graphStats = _preprocessData();

    setSets(graphStats[0]);
    setRepetitions(graphStats[1]);
    setType(graphStats[2]);
  }, [stats]);

  function _preprocessData() {
    const data = stats[index];
    const sets = { done: data.exercise.currentSet, total: data.sets };
    const repsDone = Number.parseFloat(data.exercise.repetitionInSet);
    const repsTotal = Number.parseFloat(data.reps);
    const type = data.type;

    // prepare now the list of 'repetitions' for the graph
    const reps = [];
    const fraction = repsDone / repsTotal;
    for (let index = 1; index <= repsTotal; index++) {
      reps.push({
        id: index,
        fill: index <= repsDone ? '#06acd6' : '#77777766',
        value: fraction * 100,
      });
    }

    return [sets, reps, type];
  }

  return (
    <div>
      <PieChart key={incrementableKey} width={width} height={height}>
        <text
          x={width / 2}
          y={height / 2 + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={16}
        >
          Type: {type}
        </text>
        <text
          x={width / 2}
          y={height / 2 - 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={27}
        >
          {sets.done + '/' + sets.total}
        </text>
        <Pie
          animationDuration={700}
          data={repetitions}
          outerRadius={reactDonutChartOuterRadius}
          innerRadius={reactDonutChartInnerRadius}
          startAngle={rotateAngleToLookBetter}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          dataKey="value"
        />
      </PieChart>
    </div>
  );
}

export default ExerChart;
