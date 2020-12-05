<template>
  <button @click="clickEvent">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  data() {
    return {
      count_: null,
    };
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.count_ = newValue;
      },
    },
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    clickEvent() {
      this.count_ += 1;
      this.$emit('increment', this.count_);
    },
  },
};
</script>

<style></style>
