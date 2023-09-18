const data = [
  { id: 9, value: 10, fill: '#437fce' },
  { id: 8, value: 10, fill: '#06acd6' },
  { id: 7, value: 10, fill: '#06acd6' },
  { id: 6, value: 10, fill: '#06acd6' },
  { id: 5, value: 10, fill: '#06D6A0' },
  { id: 4, value: 10, fill: '#06D6A0' },
  { id: 3, value: 10, fill: '#06D6A0' },
  { id: 2, value: 10, fill: '#845EC2' },
  { id: 1, value: 10, fill: '#845EC2' },
  { id: 0, value: 10, fill: '#f00' },
];
const reactDonutChartInnerRadius = 62.5;
const reactDonutChartOuterRadius = 125;
const rotateAngleToLookBetter = -270;
const width = 350;
const height = 350;
const qualityMapping = [
  {
    indexes: [0, 1, 2, 3],
    label: 'Keep going..',
  },
  {
    indexes: [4, 5, 6],
    label: 'Going well.',
  },
  {
    indexes: [7, 8, 9],
    label: 'Almost there.',
  },
  {
    indexes: [10],
    label: 'Well done!',
  },
];

export {
  data,
  reactDonutChartInnerRadius,
  reactDonutChartOuterRadius,
  rotateAngleToLookBetter,
  width,
  height,
  qualityMapping,
};
