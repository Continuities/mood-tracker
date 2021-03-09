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

import type { GoogleConfig } from 'providers/GoogleLoginProvider.js';

type Props = {|
  config: GoogleConfig,
  path?: string
|};

const Dashboard = ({ config }: Props) => {
  const objects = useObjects('mood');
  return (
    <GoogleLoginProvider config={config}>
      <ul>
        {objects.map((o, i) => (
          <li key={i}>
            {JSON.stringify(o)}
          </li>
        ))}
      </ul>
      {/* <GoogleFit /> */}
      <NotificationButton />
    </GoogleLoginProvider>
  );
};

export default Dashboard;