const emitNavigationEvent = function (location) {
  this.$emit('navigate', location);
};


const VM = new Vue({
  el: '#proefkonijnen',
  data: {
    currentView: 'home',
  },

  methods: {
    changeView: function (newView) {
      this.currentView = newView;
    }
  },

  components: {
    home: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '#main_menu_template'
    },

    live: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '#live_template'
    },

    diy: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '#diy_template'
    },

    questions: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '#questions_template'
    }
  }
});