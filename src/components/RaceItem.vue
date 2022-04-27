<script>
import categories from '../shared/categories';
export default {
  name: 'RaceItem',
  props: ['race'],
  data() {
    return {
      countdown: '',
      isStarted: false,
      raceType: '',
    };
  },
  methods: {
    formatCountdown() {
      const timeDiff = this.race.advertised_start.seconds - Math.round(Date.now() / 1000);
      if (timeDiff > 0) {
        const h = Math.floor(timeDiff / 3600);
        const m = Math.floor((timeDiff % 3600) / 60);
        const s = Math.floor(timeDiff % 60);
        const countdown = [];
        if (h > 0) countdown.push(`${h}h`);
        if (m > 0) countdown.push(`${m}m`);
        countdown.push(`${s}s`);
        this.countdown = countdown.join(' ');
      } else {
        if (timeDiff > -60) {
          this.countdown = `${timeDiff}s`;
        } else {
          this.countdown = 'Closed';
        }
        this.isStarted = true;
      }
    },
    getRaceType() {
      const { name } = categories.find((cat) => cat.id === this.race.category_id);
      return name ? name : 'unknown';
    },
  },
  mounted() {
    this.formatCountdown();
    this.raceType = this.getRaceType();
    setInterval(this.formatCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timeoutHandler);
  },
};
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
        <use v-if="raceType === 'greyhound'" xlink:href="../assets/svg-racing-icon.svg#greyhound-racing"></use>
        <use v-if="raceType === 'harness'" xlink:href="../assets/svg-racing-icon.svg#harness-racing"></use>
        <use v-if="raceType === 'horse'" xlink:href="../assets/svg-racing-icon.svg#horse-racing"></use>
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
