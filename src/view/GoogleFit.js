/**
 * Displays data from Google Fit
 * @author mtownsend
 * @since March 07, 2021
 * @flow
 **/

import React from 'react';
import { useSteps } from 'providers/GoogleFitProvider.js';

const GoogleFit = () => {
  const steps = useSteps();
  return (
    <div>{JSON.stringify(steps)}</div>
  )
};

export default GoogleFit;