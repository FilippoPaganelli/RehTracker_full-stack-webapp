import React, { useContext, useEffect, useState } from 'react';
import { Pie, PieChart } from 'recharts';
import AuthContext from '../../contexts/AuthContext';
import {
  data,
  height,
  reactDonutChartInnerRadius,
  reactDonutChartOuterRadius,
  rotateAngleToLookBetter,
  width,
  qualityMapping,
} from './offlineData';

function ExerChart(props) {
  const index = props.index;
  const [incrementableKey, setKey] = useState(index + 1);
  const { stats } = useContext(AuthContext);
  const [repetitions, setRepetitions] = useState();
  const [sets, setSets] = useState({ done: 0, total: 0 });
  const [type, setType] = useState('-');
  const [quality, setQuality] = useState('Could be better');

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
    setQuality(graphStats[3]);
  }, [stats]);

  function _getQualityLabel(fract) {
    const i = Math.floor(fract * 10.0);
    let label = '-';
    qualityMapping.forEach((step) => {
      if (step.indexes.includes(i)) {
        label = step.label;
      }
    });
    return label;
  }

  function _preprocessData() {
    const rawData = stats[index];
    const sets = { done: rawData.exercise.currentSet, total: rawData.sets };
    const repsDone = Number.parseFloat(rawData.exercise.repetitionInSet);
    const repsTotal = Number.parseFloat(rawData.reps);
    const type = rawData.type;

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
    const qual = _getQualityLabel(fraction);

    return [sets, reps, type, qual];
  }

  return (
    <div>
      <PieChart key={incrementableKey} width={width} height={height}>
        <text
          x={width / 2}
          y={height / 2 + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={15}
        >
          {/* Type: {type} */}
          {quality}
        </text>
        <text
          x={width / 2}
          y={height / 2 - 15}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={26}
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
