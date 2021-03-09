/**
 * View for looking at mood data
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

import React from 'react';
import GoogleLoginProvider from 'providers/GoogleLoginProvider.js';
// import GoogleFit from 'view/GoogleFit.js';
import NotificationButton from 'view/NotificationButton.js';
import { useObjects } from 'providers/DatabaseProvider.js';
import { 
  VictoryLine, 
  VictoryChart, 
  VictoryAxis,
  VictoryTheme 
} from 'victory';
import { DatabaseConfig } from 'config.js';

import type { GoogleConfig } from 'providers/GoogleLoginProvider.js';

type Props = {|
  config: GoogleConfig,
  path?: string
|};

const Dashboard = ({ config }: Props) => {
  const objects = useObjects(DatabaseConfig.store);
  return (
    <GoogleLoginProvider config={config}>
      <VictoryChart
        height={150}
        theme={VictoryTheme.material}
        domainPadding={0}
      >
        <VictoryAxis
          tickFormat={x => new Date(x).toLocaleDateString()}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[ 1, 2, 3, 4, 5 ]}
        />

        <VictoryLine
          data={objects}
          x='timestamp'
          y='mood'
        />
      </VictoryChart>
      {/* <GoogleFit /> */}
      <NotificationButton />
    </GoogleLoginProvider>
  );
};

export default Dashboard;