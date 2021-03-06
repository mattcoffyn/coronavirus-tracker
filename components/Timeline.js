import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

const GET_TIMELINE = gql`
  query GET_TIMELINE {
    timeline {
      date
      confirmed
      deceased
    }
  }
`;

const Timeline = () => {
  const [active, setActive] = useState('confirmed');

  const { data, loading, error } = useQuery(GET_TIMELINE);

  if (loading) return <p>Loading...</p>;

  let confirmedData = [];
  data.timeline.map((time) => {
    const formattedNumber = time.confirmed / 1000;

    confirmedData.push({
      x: new Date(time.date),
      y: formattedNumber,
      // deceased: time.deceased,
    });
  });

  let deceasedData = [];
  data.timeline.map((time) => {
    deceasedData.push({
      x: new Date(time.date),
      y: time.deceased,
      // deceased: time.deceased,
    });
  });

  return (
    <>
      <XYPlot width={800} height={300} xType="time">
        <LineSeries data={confirmedData} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </>
  );
};

export default Timeline;
