<script>
export default {
  name: 'FadeTransitionGroup',
  render: function (h) {
    let slots = Array.isArray(this.$slots.default)
      ? this.$slots.default.map((slot) => {
          if (slot.data.staticClass === undefined) {
            slot.data.staticClass = 'fade-list-item';
          } else {
            slot.data.staticClass += ' fade-list-item';
          }
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
        on: this.$listeners,
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
