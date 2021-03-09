/**
 * Main App view
 * @author mtownsend
 * @since March 06, 2021
 * @flow
 **/

import React from 'react';
import { Router } from "@reach/router"
import RecordMood from 'view/RecordMood.js';
import Dashboard from 'view/Dashboard.js';
import DatabaseProvider from 'providers/DatabaseProvider.js';
import { DatabaseConfig } from 'config.js';

const GoogleConfig = {
  client_id: '588132758538-05f4gumqggpruamsrmmolo14av3072af.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/fitness.activity.read',
};

const createDatabaseSchema = (db, currentVersion) => {
  if (currentVersion < 1) {
    // Version 1 is the first version of the database.
    db.createObjectStore('mood', { keyPath: "timestamp" });
  }
};

const App = (): React$Node => {
  return (
    <DatabaseProvider 
      name={DatabaseConfig.database}
      version={DatabaseConfig.version}
      createSchema={createDatabaseSchema}
    >
      <Router>
        <Dashboard config={GoogleConfig} path="/" />
        <RecordMood path="/mood/:value" />
      </Router>
    </DatabaseProvider>
  );
};

export default App;