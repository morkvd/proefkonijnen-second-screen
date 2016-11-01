// custom navigation event
// `location` must be the name of one of VM's child components
var emitNavigationEvent = function (location) {
  this.$emit('navigate', location);
};

var VM = new Vue({
  el: '#proefkonijnen',
  data: function () {
    return {
      currentView: 'home',
    };
  },

  methods: {
    changeView: function (newView) {
      this.currentView = newView;
    },
  },

  components: {
    home: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '\
        <section class="main-menu-container">\
          <section class="top-bar">\
            <p class="top-bar-text">proefkonijnen</p>\
          </section>\
          <section class="container">\
            <button v-on:click="navigate(\'live\')" class="button main-menu">Speel live mee</button>\
            <button v-on:click="navigate(\'diy\')" class="button main-menu">Doe het lekker zelf</button>\
            <button v-on:click="navigate(\'questions\')" class="button main-menu">Bezopen vragen</button>\
          </section>\
        </section>'
    },

    live: {
      data: function() {
        return {
          currentQuestion: 0,
          currentCorrectAnswer: null,
          givenAnswer: null,
          questionState: 0,
          questions: [
            {
              question: 'Wat gaat er gebeuren?',
              correctAnswer: 2,
              answers: [
                'A: Het water begint te koken',
                'B: Het water bevriest',
                'C: Het water vliegt in de fik'
              ]
            },
            {
              question: 'Waarom duurde het 300 jaar voordat de reuzeschildpad zijn wetenschappelijke naam kreeg?',
              correctAnswer: 0,
              answers: [
                'A: Hij smaakte te lekker',
                'B: Hij was te gevaarlijk',
                'C: Ze waren het vergeten'
              ]
            }
          ],
        };
      },
      methods: {
        navigate: emitNavigationEvent,
        nextQ: function() {
          this.givenAnswer = null;
          this.questionState = 0;
          this.currentCorrectAnswer = null;
          this.currentQuestion++;
        },
        giveAnswer: function(answer) {
          this.givenAnswer = answer;
          this.currentCorrectAnswer = this.questions[this.currentQuestion].correctAnswer;
          this.questionState++;
        },
        showScoreBoard: function() {

        },
      },
      template: '\
        <section class="live-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">Terug</button>\
            <p class="top-bar-text">Speel live mee</p>\
          </section>\
          <section class="container">\
            <section v-if="questionState === 0">\
              <p>{{ questions[currentQuestion].question }}</p>\
              <ol class="answer-list-container">\
                <li class="answer-list" v-for="(answer, index) in questions[currentQuestion].answers">\
                  <button class="button answer" v-on:click="giveAnswer(index)">{{ answer }}</button>\
                </li>\
              </ol>\
            </section>\
            <section v-if="questionState === 1">\
              <p>{{ questions[currentQuestion].question }}</p>\
              <ol class="answer-list-container">\
                <li class="answer-list" v-for="(answer, index) in questions[currentQuestion].answers">\
                  <button\
                    class="button answer"\
                    v-bind:class="{\
                      chosen: (givenAnswer === index),\
                      correct: (index === currentCorrectAnswer),\
                      wrong: !(index === currentCorrectAnswer),\
                    }"\
                  >\
                    {{ answer }}\
                  </button>\
                </li>\
              </ol>\
              <button \
                v-if="currentQuestion < questions.length - 1"\
                v-on:click="nextQ" class="button answer">\
                  volgende vraag\
              </button>\
              <button \
                v-if="currentQuestion === questions.length - 1"\
                v-on:click="showScoreBoard" class="button answer">\
                  zie je score\
              </button>\
            </section>\
          </section>\
        </section>',
    },

    diy: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '\
        <section class="diy-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">Terug</button>\
            <section class="container">\
              <p class="top-bar-text">Doe het lekker zelf</p>\
            </section>\
          </section>\
        </section>',
    },

    questions: {
      methods: {
        navigate: emitNavigationEvent,
      },
      template: '\
        <section class="questions-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">Terug</button>\
            <section class="container">\
              <p class="top-bar-text">Bezopen vragen</p>\
            </section>\
          </section>\
        </section>',
    },
  }
});
