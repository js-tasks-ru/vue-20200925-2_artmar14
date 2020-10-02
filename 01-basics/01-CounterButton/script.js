import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#counter',

  data() {
    return {
      counterValue: 0,
    };
  },
  methods: {
    counter() {
      this.counterValue +=1;
    }
  },


});



// Рекомендуется использовать МЕТОД в качестве обработчика события
