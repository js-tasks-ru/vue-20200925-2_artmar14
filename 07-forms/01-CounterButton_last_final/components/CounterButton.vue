<template>
  <div>
    <button type="button" @click="clickEvent">{{ count }}</button>
  </div>
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
      required: false,
      default: 0,
    },
  },
  watch: {
    count: {
      handler: function (newValue) {
        this.count_ = newValue;
      },
      immediate: true,
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
