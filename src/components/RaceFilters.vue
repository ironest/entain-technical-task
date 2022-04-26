<template>
  <div class="categories">
    <label v-for="cat in allCategories" :key="cat.id">
      <input type="checkbox" :value="cat.id" v-model="selectedCategories" @change="handleCheck($event)" />
      <span>{{ cat.name }}</span>
    </label>
  </div>
</template>

<script>
import categories from '../shared/categories';
export default {
  name: 'RaceFilters',
  data() {
    return {
      allCategories: categories,
      selectedCategories: [],
    };
  },
  methods: {
    handleCheck() {
      this.$emit('filterBy', this.selectedCategories);
    }
  },
  mounted() {
    this.selectedCategories = this.allCategories.map((c) => c.id);
    this.$emit('filterBy', this.selectedCategories);
  },
};
</script>

<style></style>
