<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import RaceList from '../components/RaceList.vue';
import RaceFilters from '../components/RaceFilters.vue';

// Reactive variables
const races = ref([]);
const filteredRaces = ref([]);
// const lastEpochFetch = ref(-1);
const selectedCategories = ref([]);

// Utility functions (simply copied from the original method)
function getCurrentEpoch() {
  return Math.round(Date.now() / 1000);
}

function handleFilters(values) {
  selectedCategories.value = values;
  filteredRaces.value = races.value.filter((race) => selectedCategories.value.includes(race.category_id)).slice(0, 5);
}

let loading = false;

function fetchRaces() {
  loading = true;
  fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=20')
    .then((response) => response.json())
    .then((result) => {
      const ids = result.data.next_to_go_ids;
      races.value = ids
        .map((id) => result.data.race_summaries[id])
        .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
        .filter((race) => race.advertised_start.seconds > getCurrentEpoch());

      filteredRaces.value = races.value
        .filter((race) => selectedCategories.value.includes(race.category_id))
        .slice(0, 5);

      loading = false;
    })
    .catch((err) => console.log(err.message));
}

let intervalId;
onMounted(() => {
  fetchRaces();
  intervalId = setInterval(() => {
    if (
      !loading.value && // the API is currently being fetched
      races.value[0]?.advertised_start.seconds < getCurrentEpoch() - 60
    ) {
      fetchRaces();
    }
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <h1>Entain Technical Task</h1>
  <div v-if="races.length > 0">
    <RaceFilters @filterBy="handleFilters" />

    <RaceList :races="filteredRaces" />
  </div>
</template>
