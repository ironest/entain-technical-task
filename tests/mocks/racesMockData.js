export const racesMockData = [
  {
    meeting_name: 'Towcester Bags',
    race_number: '11',
    advertised_start: { seconds: Math.round(Date.now() / 1000) + 130 }, // 2m 10s in the future
    category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', // greyhound
  },
  {
    meeting_name: 'Thirsk',
    race_number: '12',
    advertised_start: { seconds: Math.round(Date.now() / 1000) + 185 }, // 3m 5s in the future
    category_id: '161d9be2-e909-4326-8c2c-35ed71fb460b', // harness
  },
  {
    meeting_name: 'Fairview',
    race_number: '13',
    advertised_start: { seconds: Math.round(Date.now() / 1000) + 3840 }, // 1h 4m in the future
    category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', // horse
  },
  {
    meeting_name: 'Fairview',
    race_number: '14',
    advertised_start: { seconds: Math.round(Date.now() / 1000) - 60 }, // 1 min in the past
    category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', // horse
  },
  {
    meeting_name: 'Fairview',
    race_number: '15',
    advertised_start: { seconds: Math.round(Date.now() / 1000) - 30 }, // 30 seconds in the past
    category_id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', // horse
  },
];
