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

<style lang="scss">
.categories {
  display: flex;
  justify-content: center;
  label {
    cursor: pointer;
    min-width: 120px;
    padding: 12px 16px;
    background-color: rgba(63, 81, 181, 0.08);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin: 24px 12px;
    user-select: none;
    input[type='checkbox'] {
      margin-right: 12px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .categories {
    display: flex;
    flex-direction: column;
    label {
      margin: 6px 0;
    }
    label:last-of-type {
      margin-bottom: 24px;
    }
  }
}
</style>
