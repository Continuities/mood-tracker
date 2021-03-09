/**
 * Global config values
 * @author mtownsend
 * @since March 09, 2021
 * @flow
 **/

export const DatabaseConfig = {
  database: 'mood-tracker',
  store: 'mood',
  version: 1
};


type NotificationConfigType = {|
  schedule: NotificationSchedule,
  title: string
|};
// TODO: Replace this with a cron syntax parser
export type NotificationSchedule = {|
  hour: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
|}
export const NotificationConfig: NotificationConfigType = {
  schedule: { hour: 18 },
  title: 'How was your day?'
};