/**
 * Provides access to an indexDB database
 * @author mtownsend
 * @since March 08, 2021
 * @flow
 **/

import React, { 
  createContext, 
  useEffect, 
  useState, 
  useContext,
  useCallback
} from 'react';

const DatabaseContext = createContext();

type Props = {|
  children?: React$Node,
  name: string,
  createSchema: (db:IDBDatabase, currentVersion:number) => void,
  version?: number
|};

const onError = ({ target: { error }}) => {
  console.error('[DB] Error loading database', error);
};

const DatabaseProvider = ({ children, createSchema, name, version = 1 }: Props) => {

  const [ database, setDatabase ] = useState<?IDBDatabase>(null);

  useEffect(() => {
    const DBOpenRequest:IDBOpenDBRequest = window.indexedDB.open(name, version);
    DBOpenRequest.onerror = onError;

    DBOpenRequest.onsuccess = ({ target: { result }}) => {
      console.info('[DB] Connected to database');
      setDatabase(result);
    };

    // This event handles the event whereby a new version of the database needs to be created
    // Either one has not been created before, or a new version number has been submitted via the
    // window.indexedDB.open line above
    // it is only implemented in recent browsers
    DBOpenRequest.onupgradeneeded = ({ oldVersion, target: { result }}) => {
      result.onerror = onError;
      createSchema(result, oldVersion);
      console.info(`[DB] Database upgraded from version ${oldVersion} to ${result.version}`);
    };
  }, [ name, version ]);

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useObjects = (storeName:string):Array<Object> => {
  const [ objects, setObjects ] = useState<Array<Object>>([]);
  const db = useContext(DatabaseContext);
  
  useEffect(() => {
    if (!db) {
      return;
    }
    const store = db
      .transaction(storeName)
      .objectStore(storeName);
    const objects = [];
    store.openCursor().onsuccess = ({ target: { result }}) => {
      if (result) {
        objects.push(result.value);
        result.continue();
      }
      else {
        setObjects(objects);
      }
    };
  }, [ db, storeName ]);

  return objects;
};

export const useAdd = (storeName:string): (object:Object) => Promise<void> => {
  const db = useContext(DatabaseContext);
  return useCallback((object: Object): Promise<void> => {
    if (!db) {
      return Promise.reject('No database connection');
    }
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(storeName, 'readwrite')
        .objectStore(storeName)
        .add(object);
      request.onsuccess = () => resolve();
      request.onerror = ({ target: { error }}) => reject(`Add failed: ${error}`);
    }); 
  }, [ db, storeName ])
};

export default DatabaseProvider;