<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    nodes() {
      let index = (this.page * this.perPage) - this.perPage;
      let count = this.perPage;
      return (Array.isArray(this.$slots.default)) ? [...this.$slots.default].splice(index, count) : [];
    }
  },
  render(h) {
    return h('div', this.nodes);
  }
};
</script>

<style scoped></style>
