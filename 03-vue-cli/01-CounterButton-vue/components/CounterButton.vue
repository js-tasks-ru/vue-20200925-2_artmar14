<template>
  <div>
    <button type="button" @click="counter">{{ count }}</button>
  </div>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    counter() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style></style>
