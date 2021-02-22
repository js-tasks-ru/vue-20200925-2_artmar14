<script>
export default {
  name: 'FadeTransitionGroup',
  render: function (h) {
    let slots = Array.isArray(this.$slots.default)
      ? this.$slots.default.map((slot) => {
          slot.data.staticClass === undefined
            ? (slot.data.staticClass = 'fade-list-item')
            : (slot.data.staticClass += ' fade-list-item');
          console.log(slot.data.staticClass);
          return slot;
        })
      : null;
    return h(
      'transition-group',
      {
        attrs: { ...this.$attrs, name: 'fade-list' },
        class: {
          'fade-list': true,
        },
      },
      slots,
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
