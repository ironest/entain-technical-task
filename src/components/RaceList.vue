<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="bg-indigo-600">
          <th class="w-1/4 py-4 px-6 text-left text-white">Location</th>
          <th class="w-1/4 py-4 px-6 text-left text-white">Type</th>
          <th class="w-1/4 py-4 px-6 text-left text-white">Race #</th>
          <th class="w-1/4 py-4 px-6 text-left text-white">Time</th>
        </tr>
      </thead>

      <tbody class="bg-white">
        <RaceItem
          v-for="race in races"
          :key="race.race_id"
          :race="race"
          :countdown="race.advertised_start.seconds - Math.round(Date.now() / 1000)"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import RaceItem from './RaceItem.vue';

// Declare props
defineProps(['races']);
</script>
