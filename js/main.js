const VM = new Vue({
  el: '#proefkonijnen',
  data: {
    currentComponent: null,
    componentsArray: ['live', 'diy', 'question']
  },

  components: {

    live : {
      data: function() {
        return { title: 'speel live mee' };
      },
      template: '<h1>{{ title }}</h1>',
    },

    diy: {
      data: function() {
        return { title: 'doe het lekker zelf' };
      },
      template: '<h1>{{ title }}</h1>',
    },

    question: {
      data: function() {
        return { title: 'bezopen vragen' };
      },
      template: '<h1>{{ title }}</h1>',
    },
  },

  methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
    }
  }
});
