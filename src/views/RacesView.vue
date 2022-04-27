<script>
import RaceList from '../components/RaceList.vue';
import RaceFilters from '../components/RaceFilters.vue';

export default {
  name: 'RaceView',
  components: {
    RaceList,
    RaceFilters,
  },
  data() {
    return {
      races: [],
      filteredRaces: [],
      timeoutHandler: null,
      lastEpochFetch: -1,
      loading: true,
      selectedCategories: [],
    };
  },
  methods: {
    getCurrentEpoch() {
      return Math.round(Date.now() / 1000);
    },
    handleFilters(values) {
      this.selectedCategories = values;
      this.filteredRaces = this.races.filter((race) => this.selectedCategories.includes(race.category_id)).slice(0, 5);
    },
    fetchRaces() {
      fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=20')
        .then((response) => response.json())
        .then((result) => {
          this.lastEpochFetch = this.getCurrentEpoch();
          const ids = result.data.next_to_go_ids;
          this.races = ids
            .map((id) => result.data.race_summaries[id])
            .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
            .filter((race) => race.advertised_start.seconds > this.getCurrentEpoch() + 60);

          this.filteredRaces = this.races
            .filter((race) => this.selectedCategories.includes(race.category_id))
            .slice(0, 5);

          this.loading = false;
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchRaces();
    this.timeoutHandler = setInterval(() => {
      if (
        !this.loading && // the API is currently being fetched
        this.races[0].advertised_start.seconds < this.getCurrentEpoch() - 60
      ) {
        this.loading = true;
        this.fetchRaces();
      }
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timeoutHandler);
  },
};
</script>

<template>
  <h1>Entain Technical Task</h1>
  <div v-if="races.length > 0">
    <RaceFilters @filterBy="handleFilters" />

    <RaceList :races="filteredRaces" :key="lastEpochFetch" />
  </div>
</template>
