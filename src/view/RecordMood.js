/**
 * View that records a mood parameter
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

import React, { useEffect, useState } from 'react';
import { useAdd } from 'providers/DatabaseProvider.js';

type Props = {|
  value?: string,
  path?: string
|};

const RecordMood = ({ value }: Props) => {
  const [ message, setMessage ] = useState('idle...');
  const add = useAdd('mood');

  useEffect(() => {
    value && add({
      timestamp: new Date().getTime(),
      mood: value
    })
      .then(() => setMessage(`Added mood ${value}`))
      .catch(err => {
        console.log(err);
        setMessage('err');
      });
  }, [ add, value ]);

  return (
    <div>{message}</div>
  );
};

export default RecordMood;