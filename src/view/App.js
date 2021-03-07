/**
 * Main App view
 * @author mtownsend
 * @since March 06, 2021
 * @flow
 **/

import React from 'react';
import GoogleLoginProvider from 'providers/GoogleLoginProvider.js';
import GoogleFit from 'view/GoogleFit.js';

const GoogleConfig = {
  client_id: '588132758538-05f4gumqggpruamsrmmolo14av3072af.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/fitness.activity.read',
};

const App = (): React$Node => {
  return (
    <GoogleLoginProvider config={GoogleConfig}>
      <GoogleFit />
    </GoogleLoginProvider>
  );
};

export default App;