export const CounterButton = {
  name: 'CounterButton',
  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="counter">{{ count }}</button>`,

  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    }
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    counter() {
      this.$emit('increment', this.count + 1 );
    }
  }
};
