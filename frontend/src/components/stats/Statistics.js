import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import ExerChart from './ExerChart';

function Statistics(props) {
  const { signedIn } = useContext(AuthContext);
  return (
    <div>
      {signedIn === true ? (
        <h6>
          Please, sign in to see your exercises statistics and check your
          rehabilitation progress...
        </h6>
      ) : (
        <>
          <h6>Statistics blabla 1 2 3 etc.</h6>
          <br />
          <ExerChart number={1} />
          {/* <ExerChart number={2} />
          <ExerChart number={3} />
          <ExerChart number={4} /> */}
        </>
      )}
    </div>
  );
}

export default Statistics;
