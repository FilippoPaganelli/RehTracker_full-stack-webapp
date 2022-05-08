import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import Chart from './Chart';

function Statistics(props) {
  const { signedIn } = useContext(AuthContext);
  return (
    <div>
      {signedIn === false ? (
        <h6>
          Please, sign in to see your exercises statistics and check your
          rehabilitation progress...
        </h6>
      ) : (
        <>
          <h6>Statistics blabla 1 2 3 etc.</h6>
          <br />
          <Chart number={1} />
          <Chart number={2} />
          <Chart number={3} />
          <Chart number={4} />
        </>
      )}
    </div>
  );
}

export default Statistics;
