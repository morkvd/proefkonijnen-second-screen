// custom navigation event
// `location` must be the name of one of VM's child components
var emitNavigationEvent = function (location) {
  this.$emit('navigate', location);
};

Vue.component('todo-item', {
  template: '\
    <li>\
      <button\
        class="upvote-button"\
        v-on:click="$emit(\'upvote\')"\
        v-bind:class="{\
          voted: voted,\
        }"\
      >\
        <img class="upvote-icon" src="img/arrow-up.svg" />\
      </button>\
      {{ points }}\
      {{ title }}\
    </li>\
  ',
  props: ['title', 'points', 'voted']
})

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
          <img class="main-menu-img" src="img/logo_proefkonijnen.png" />\
          <section class="container offset">\
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
          hasEnded: false,
          totalPoints: 0,
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
            },
            {
              question: 'Gaat het Jan en Geraldine lukken om over het het kanaal te springen met een brom-mobiel?',
              correctAnswer: 2,
              answers: [
                'A: Ja dat gaan ze gemakkelijk halen',
                'B: Nee ze gaan zwemmen',
                'C: Ja maar ze gaan keihard crashen'
              ]
            },
            {
              question: 'Wat gaat het beste helpen tegen de pijn?',
              correctAnswer: 0,
              answers: [
                'A: Keihard schelden, FUCK',
                'B: Heel veel chocolade eten',
                'C: Lekker sporten'
              ]
            },
            {
              question: 'Gaat het Jan en Geraldine lukken om zelf een aardbeving te creeren?',
              correctAnswer: 1,
              answers: [
                'A: Ja dit is verbazingwekkend gemakkelijk',
                'B: Ja maar hij is zo klein dat je hem niet kunt meten',
                'C: Nee dit kan natuurlijk niet'
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
          if (this.givenAnswer === this.currentCorrectAnswer) {
            this.totalPoints++;
          }
          this.questionState++;
        },
        showScoreBoard: function() {
          this.hasEnded = true;
        },
      },
      template: '\
        <section class="live-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">\
              <img src="img/previous.svg"/>\
            </button>\
            <p class="top-bar-text">Speel live mee</p>\
          </section>\
          <section v-if="hasEnded" class="container">\
            <h1 v-if="totalPoints === 1">Je hebt {{ totalPoints }} vraag goed beantwoord!</h1>\
            <h1 v-else>Je hebt {{ totalPoints }} vragen goed beantwoord!</h1>\
            <h2>van de 7820 thuisspelers sta jij de 1206de plek, goed gedaan</h2>\
          </section>\
          <section v-else class="container">\
            <section v-if="questionState === 0">\
              <h1>{{ questions[currentQuestion].question }}</h1>\
              <ol class="answer-list-container">\
                <li class="answer-list" v-for="(answer, index) in questions[currentQuestion].answers">\
                  <button class="button answer" v-on:click="giveAnswer(index)">{{ answer }}</button>\
                </li>\
              </ol>\
            </section>\
            <section v-if="questionState === 1">\
              <h1>{{ questions[currentQuestion].question }}</h1>\
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
                v-on:click="nextQ" class="button answer next-question">\
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
            <button v-on:click="navigate(\'home\')" class="back-button">\
              <img src="img/previous.svg"/>\
            </button>\
            <p class="top-bar-text">Doe het lekker zelf</p>\
          </section>\
          <section class="container">\
            <p class="top-bar-text">Doe het lekker zelf</p>\
          </section>\
        </section>',
    },

    questions: {
      data: function() {
        return {
          newTodoText: '',
          todos: [
            { points: 4, voted: false, text: 'Do the dishes' },
            { points: 2, voted: false, text: 'Take out the trash' },
            { points: 6, voted: false, text: 'Mow the lawn' },
            { points: 4, voted: false, text: 'Do the dishes' },
            { points: 2, voted: false, text: 'Take out the trash' },
            { points: 5, voted: false, text: 'Mow the lawn' },
            { points: 1, voted: false, text: 'Do the dishes' },
            { points: 2, voted: false, text: 'Take out the trash' },
            { points: 3, voted: false, text: 'Mow the lawn' },
          ],
        };
      },
      computed: {
        sortedTodos: function() {
          return this.todos.sort(function(a, b) {
            return b.points - a.points;
          });
        },
      },
      methods: {
        addNewTodo: function() {
          this.todos.push(this.newTodoText)
          this.newTodoText = ''
        },
        upvote: function(i) {
          if (!this.todos[i].voted) {
            this.todos[i].points++;
          }
          this.todos[i].voted = true;
        },
        navigate: emitNavigationEvent,
      },
      template: '\
        <section class="questions-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">\
              <img src="img/previous.svg"/>\
            </button>\
            <p class="top-bar-text">Bezopen vragen</p>\
          </section>\
          <section class="container">\
            <div id="todo-list-example">\
              <input\
                v-model="newTodoText"\
                v-on:keyup.enter="addNewTodo"\
                placeholder="Add a todo"\
              >\
              <ul class="question-list">\
                <li\
                  class="user-question"\
                  is="todo-item"\
                  v-for="(todo, index) in sortedTodos"\
                  v-bind:title="todo.text"\
                  v-bind:points="todo.points"\
                  v-bind:voted="todo.voted"\
                  v-on:upvote="upvote(index)"\
                ></li>\
              </ul>\
            </div>\
          </section>\
        </section>',
    },
  }
});
