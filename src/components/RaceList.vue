<template>
  <table>
    <tr>
      <th>Location</th>
      <th>Type</th>
      <th>Race #</th>
      <th>Time</th>
    </tr>

    <RaceItem
      v-for="race in races"
      :key="race.race_id"
      :race="race"
      :countdown="race.advertised_start.seconds - Math.round(Date.now() / 1000)"
    />
  </table>
</template>

<script setup>
import RaceItem from './RaceItem.vue';

// Declare props
defineProps(['races']);
</script>

<style lang="scss">
table {
  width: 100%;
  border-radius: 8px;
  border-spacing: 0;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);

  // To properly have round corners
  overflow: hidden;

  tr {
    height: 56px;

    &:nth-child(odd) {
      background-color: rgba(63, 81, 181, 0.08);
    }

    &:hover {
      background-color: rgba(255, 234, 0, 0.5);
      td {
        font-weight: 800;
        font-size: 16px;
      }
    }

    th,
    td {
      padding: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      color: rgba(0, 0, 0, 0.54);
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      width: 20%;
    }

    th {
      background: #3f51b5;
      color: white;
    }

    th:first-of-type,
    td:first-of-type {
      padding-left: 24px;
      width: 40%;
    }

    th:last-of-type,
    td:last-of-type {
      padding-right: 24px;
    }

    td {
      color: rgba(0, 0, 0, 0.87);
      font-weight: 400;
    }
  }
}
</style>
