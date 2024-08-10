// Base API URL
export const BASE_URL = 'https://api.neds.com.au/rest/v1/racing/';

// A user should see 5 races at all times
export const MAX_RACES_SHOWN = 5;

/*
 * The given API (/v1/racing/?method=nextraces) does not guarantee any minimum number of races for each category.
 * I could fetch 100 races at once and, statistically speaking, I would most likely get at least 5 races for each category.
 * I decided to settle for something in the middle and having the app fetching 20 races and showing (at max) 5 races.
 */
export const MAX_RACES_FETCHED = 20;
