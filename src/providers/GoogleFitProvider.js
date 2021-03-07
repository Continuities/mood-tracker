/**
 * Provides data from Google Fit
 * @author mtownsend
 * @since March 07, 2021
 * @flow
 **/

import { useState, useEffect } from 'react';
import { useGoogleToken } from 'providers/GoogleLoginProvider.js';

export const useSteps = () => {

  const [ data, setData ] = useState(null);
  const token = useGoogleToken();

  console.log(token);

  useEffect(() => {

    if (!token) {
      return;
    }

    fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json;encoding=utf-8",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "aggregateBy": [{
          "dataTypeName": "com.google.step_count.delta",
          "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": 1438705622000, // TODO
        "endTimeMillis": 1439310422000 // TODO
      })
    }).then(r => r.json()).then(setData);
  }, [ token ]);

  return data;
};
