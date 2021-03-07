/**
 * Prompts for login and provides login token hooks
 * @author mtownsend
 * @since March 07, 2021
 * @flow
 **/

import React, { createContext, useContext, useState, useEffect } from 'react';
import useScript from '../hooks/useScript.js';

export type GoogleConfig = {|
  client_id: string,
  cookie_policy?: string,
  scope?: string,
  fetch_basic_profile?: boolean,
  hosted_domain?: string,
  ux_mode?: 'popup' | 'redirect',
  redirect_uri?: string
|};

const Context = createContext(null);

type Props = {|
  config: GoogleConfig,
  children: React$Node
|};

const GoogleLoginProvider = ({ config, children }: Props): React$Node => {
  const [ token, setToken ] = useState(null);
  const apiStatus = useScript('https://apis.google.com/js/api.js');
  
  const onSignin = res => {
    const auth = res.getAuthResponse(true);
    setToken(auth.access_token);
  };

  const doSignin = GoogleAuth => {
    if (GoogleAuth.isSignedIn.get()) {
      onSignin(GoogleAuth.currentUser.get());
    }
    else {
      GoogleAuth.signIn().then(onSignin);
    }
  };

  useEffect(() => {
    if (apiStatus !== 'ready') {
      return;
    }
    window.gapi.load('auth2', () => {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      if (GoogleAuth) {
        doSignin(GoogleAuth);
      }
      else {
        window.gapi.auth2.init(config).then(doSignin);
      }
    });
  }, [ apiStatus ])

  return  (
    <Context.Provider value={token}>
      {children}
    </Context.Provider>
  );
};

export default GoogleLoginProvider;

export const useGoogleToken = (): ?Object => useContext(Context);