<template>
  <div>
    <template v-for="item in currentItems">
      <slot :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
    items: {
      type: Array,
    },
  },
  computed: {
    currentItems() {
      let index = this.page * this.perPage - this.perPage;
      let count = this.perPage;
      return Array.isArray(this.items)
        ? [...this.items].splice(index, count)
        : [];
    },
  },
};
</script>

<style></style>
