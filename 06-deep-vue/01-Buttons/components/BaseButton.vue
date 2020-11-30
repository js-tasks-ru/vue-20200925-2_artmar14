<template>
  <component
    :is="tag"
    v-bind="$attrs"
    v-on="$listeners"
    class="button"
    :class="{ button_block: block }">
    <slot></slot>
  </component>
</template>

<script>
const tagsList = ['a', 'router-link', 'button'];

export default {
  name: 'BaseButton',

  props: {
    block: {
      type: Boolean,
      required: false,
    },
    tag: {
      type: String,
      required: false,
      default: 'button',
      validator: function (value) {
        return tagsList.includes(value);
      },
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
