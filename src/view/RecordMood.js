/**
 * View that lets a user record their mood
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

import React, { useState } from 'react';
import { useAdd } from 'providers/DatabaseProvider.js';
import { Typography, Box, Button, ButtonGroup } from '@material-ui/core';
import styled from 'styled-components';

// const ButtonList = styled.ul`
//   padding: 0;
//   margin: 0;
//   list-style: none;
//   display: flex;
//   font-size: 48px;
// `;

const Page = styled(Box)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

type SubmissionState = 'idle' | 'submitting' | 'complete';

const RecordMood = () => {
  const [ state, setState ] = useState<SubmissionState>('idle');
  const add = useAdd('mood');

  const submit = value => async () => {
    setState('submitting');
    await add({
      timestamp: new Date().getTime(),
      mood: value
    });
    setState('complete');
  };

  const disabled = state !== 'idle';

  return (
    <Page>
      <Typography variant="h4">
        {state === 'complete' ? 'Thanks!' : 'How was today?'}
      </Typography>
      {state !== 'complete' && (
        <ButtonGroup size='large'>
          <Button disabled={disabled} onClick={submit(5)}>😀</Button>
          <Button disabled={disabled} onClick={submit(4)}>😊</Button>
          <Button disabled={disabled} onClick={submit(3)}>😐</Button>
          <Button disabled={disabled} onClick={submit(2)}>🙁</Button>
          <Button disabled={disabled} onClick={submit(1)}>😩</Button>
        </ButtonGroup>
      )}
    </Page>
  );
};

export default RecordMood;