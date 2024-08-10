<script setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
import categories from '../shared/categories';

// Declare props
const props = defineProps(['race']);

const countdown = ref('');
const isStarted = ref(false);

function formatCountdown() {
  const timeDiff = props.race.advertised_start.seconds - Math.round(Date.now() / 1000);

  if (timeDiff > 0) {
    // If timeDiff is positive, we might have to format seconds/minutes/hours
    const h = Math.floor(timeDiff / 3600);
    const m = Math.floor((timeDiff % 3600) / 60);
    const s = Math.floor(timeDiff % 60);
    const countdownArray = [];
    if (h > 0) countdownArray.push(`${h}h`);
    if (m > 0) countdownArray.push(`${m}m`);
    countdownArray.push(`${s}s`);
    countdown.value = countdownArray.join(' ');
  } else if (timeDiff < 0 && timeDiff > -60) {
    // If timeDiff is negative it can only be up to 60 seconds in the past
    // No need to format neither minutes nor hours
    countdown.value = `Closing in ${60 + timeDiff}s`;
    isStarted.value = true;
  } else {
    countdown.value = 'Closed';
  }
}

// The original getRaceType could be a function
// but it's probably more efficient to use a computed property
// cause of reactive dependencies (and caching)
const computedRaceType = computed(() => {
  const category = categories.find((cat) => cat.id === props.race.category_id);
  // Races are filtered by categories on the api response
  return category.name;
});

let intervalId;
onMounted(() => {
  formatCountdown();
  intervalId = setInterval(formatCountdown, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <tr>
    <td>{{ race.meeting_name }}</td>
    <td>
      <svg
        id=""
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="icon"
      >
        <!-- Horrible workaround... but somehow I couldn't bind the xlink:href attribute -->
        <use v-if="computedRaceType === 'greyhound'" xlink:href="../assets/svg-racing-icon.svg#greyhound-racing"></use>
        <use v-if="computedRaceType === 'harness'" xlink:href="../assets/svg-racing-icon.svg#harness-racing"></use>
        <use v-if="computedRaceType === 'horse'" xlink:href="../assets/svg-racing-icon.svg#horse-racing"></use>
      </svg>
    </td>

    <td>{{ race.race_number }}</td>
    <td :class="{ warning: isStarted }">{{ countdown }}</td>
  </tr>
</template>

<style scoped>
.warning {
  color: red;
}
.icon {
  color: #454545;
}
</style>
