# entain-technical-task

## Task

Create a single page application that displays 'Next to go’ races using our API.

A user should see 5 races at all times, and they should be sorted by time ascending. Race should disappear from the list after 1 min past the start time (​advertised_start).

User should see meeting name (​meeting_name), race number (​race_number) and countdown timer that indicates the start of the race.

User should be able to toggle race categories to view races belonging to only the selected category.

Categories are defined by IDs and are the following.

Categories are defined by IDs and are the following.

- Greyhound racing: ​category_id: `'9daef0d7-bf3c-4f50-921d-8e818c60fe61'`
- Harness racing: ​category_id: `'161d9be2-e909-4326-8c2c-35ed71fb460b'`
- Horse racing: ​category_id: `'4a2788f8-e825-4d36-9894-efd4baf1cfae'`

## Requirements

- Use vue.js framework (​https://vuejs.org/​)
- Use Neds API to fetch a list of races

## Preview

![alt text](https://github.com/ironest/entain-technical-task/blob/screenshots/screenshots/desktop.png?raw=true)
![alt text](https://github.com/ironest/entain-technical-task/blob/screenshots/screenshots/mobile.png?raw=true)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Disclaimer & assumptions

Given the following requirements:

- `A user should see 5 races at all times`
- `User should be able to toggle race categories`

I assumed the 5 races "at all time" should only be expected when no filters are in place. Reason for this assumption is because the given API (`/v1/racing/?method=nextraces`) does not guarantee to return any minimun number of races for each category.

To overcome this issue, I could have fetched 100 races at once and, statistically speaking, I would most likely be able to get at least 5 races for each category... but I doubted that was expected. Alternatively, I've noticed that in production, the Neds website uses a different API (`/v2/racing/next-races-category-group`) that does guarantee X number of races per category. Not sure if I was allowed to use that or not... so I simply followed to the given assignment.

In conclusion, I decided to settle for something in the middle and having the app fetching 20 races at once and showing (at max) 5 races at all times.

## Documentation

### Usage:

The app is accessible from the `/` route.
Any different routes are redirected to `/`.

### Components structure:

- `views/RacesView.vue`

  - Employed as a routing landing page
  - In its template, it renders `RaceList` and `RaceFilters` components
  - On mount, it fetches races from the NEDS API and sorts the races by advertised start time
  - Whenever at least one of the races advertised start time becomes older than 60 seconds, they are removed from the "eligible" races and a new fetch is issued

- `components/RaceList`

  - Employed to render the static structure of the table containing the list of races.
  - It's responsive and adapts to small devices
  - It receives a list of races (through props) and loops through them to render X more `RaceItem` components

- `components/RaceItem`

  - Employed to render each individual table row, showing race attributes such
    - the Location (`meeting_name`)
    - the race number (`race_number`)
    - the race type (`category_id` mapped into an SVG symbol)
    - the race advertise starts (`advertised_start.seconds` transformed into a human friendly countdown)
  - It updates its own countdown each second

- `components/RaceFilters`

  - Enables the filtering/toggling feature, where a user can specify which race categories they are interested in
  - The chosen category(s) are passed back to the `RaceView` parent component through a custom event being emitted.
