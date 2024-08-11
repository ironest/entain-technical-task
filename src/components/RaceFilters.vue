<template>
  <div class="flex flex-wrap justify-center gap-4 mb-8">
    <label
      v-for="cat in allCategories"
      :key="cat.id"
      class="select-none cursor-pointer w-full sm:w-36 text-slate-700 has-[:checked]:ring-indigo-200 has-[:checked]:text-indigo-900 has-[:checked]:bg-indigo-100 rounded-lg px-5 py-3 ring-1 ring-transparent hover:bg-indigo-50"
    >
      <input
        type="checkbox"
        :id="cat.id"
        :value="cat.id"
        v-model="selectedCategories"
        @change="handleCheck($event)"
        class="mr-3"
      />
      <span class="sm:text-center">{{ cat.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import categories from '../shared/categories';

// Define emits
const emit = defineEmits(['filterBy']);

// Define state using refs
const allCategories = ref(categories);
const selectedCategories = ref([]);

// Method to handle checkbox change
function handleCheck() {
  emit('filterBy', selectedCategories.value);
}

// Emit the initial filter event when the component is mounted
onMounted(() => {
  selectedCategories.value = allCategories.value.map((c) => c.id);
  emit('filterBy', selectedCategories.value);
});
</script>

<style></style>
