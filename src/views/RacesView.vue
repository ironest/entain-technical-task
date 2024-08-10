<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import RaceList from '../components/RaceList.vue';
import RaceFilters from '../components/RaceFilters.vue';
import { BASE_URL, MAX_RACES_SHOWN, MAX_RACES_FETCHED } from '../config';

// Reactive variables
const races = ref([]);
const filteredRaces = ref([]);
// const lastEpochFetch = ref(-1);
const selectedCategories = ref([]);

// Utility functions (simply copied from the original method)
function getCurrentEpoch() {
  return Math.round(Date.now() / 1000);
}

function buildUrl(method) {
  return `${BASE_URL}?method=${method}&count=${MAX_RACES_FETCHED}`;
}

function handleFilters(values) {
  selectedCategories.value = values;
  filteredRaces.value = races.value.filter((race) => selectedCategories.value.includes(race.category_id)).slice(0, 5);
}

let loading = false;

function fetchRaces() {
  loading = true;
  fetch(buildUrl('nextraces'))
    .then((response) => response.json())
    .then((result) => {
      const ids = result.data.next_to_go_ids;
      races.value = ids
        .map((id) => result.data.race_summaries[id])
        .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
        .filter((race) => race.advertised_start.seconds >= getCurrentEpoch() - 60);

      filteredRaces.value = races.value
        .filter((race) => selectedCategories.value.includes(race.category_id))
        .slice(0, MAX_RACES_SHOWN);

      loading = false;
    })
    .catch((err) => console.log(err.message));
}

let intervalId;
onMounted(() => {
  fetchRaces();
  intervalId = setInterval(() => {
    if (races.value[0]?.advertised_start.seconds < getCurrentEpoch() - 60) {
      fetchRaces();
    }
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="bg-white py-4 sm:py-24">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h1 class="mt-2 text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Entain Technical Task</h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Single-page application displaying the "Next to go" races using the Neds API.
        </p>
      </div>
      <div class="mx-auto mt-4 sm:mt-16" v-if="races.length > 0">
        <RaceFilters @filterBy="handleFilters" />
        <RaceList :races="filteredRaces" />
      </div>
    </div>
  </div>
</template>
