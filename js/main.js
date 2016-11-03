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
      <span class="user-question-point">{{ points }}.</span>\
      <span class="user-question-title">{{ title }}</span>\
    </li>\
  ',
  props: ['title', 'points', 'voted'],
});

Vue.component('diy-story', {
  template: '\
    <li>\
      <h1 class="diy-story-title"> {{ title }} </h1>\
      <img class="diy-story-thumb" :src="thumb" />\
      <transition name="fade">\
        <div v-if="expanded">\
          <h2 class="diy-story-sub-title">Benodigdheden</h2>\
          <ul>\
            <li\
              class="diy-story-sub-title"\
              v-for="requirement in requirements"\
            >\
              {{ requirement }}\
            </li>\
          </ul>\
          <img class="diy-story-img" :src="img"/>\
          <h2 class="diy-story-sub-title">instructies</h2>\
          <p class="diy-story-instructons">{{ instructions }}</p>\
        </div>\
      </transition>\
      <button\
        class="diy-story-expand-button"\
        v-on:click="$emit(\'expand\')"\
      >\
        {{ expanded ? "minder info" : "meer info"  }}\
      </button>\
    </li>\
  ',
  props: ['title', 'thumb', 'requirements', 'img', 'instructions', 'expanded'],
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
              <img class="back-button-icon" src="img/previous.svg"/>\
            </button>\
            <p class="top-bar-text">Speel live mee</p>\
          </section>\
          <section v-if="hasEnded" class="container">\
            <h1 class="end-result" v-if="totalPoints === 1">Je hebt {{ totalPoints }} vraag goed beantwoord!</h1>\
            <h1 class="end-result" v-else>Je hebt {{ totalPoints }} vragen goed beantwoord!</h1>\
            <h2 class="end-result">van de 7820 thuisspelers sta jij de 1206de plek, goed gedaan</h2>\
          </section>\
          <section v-else class="container">\
            <section v-if="questionState === 0">\
              <h1 class="question">{{ questions[currentQuestion].question }}</h1>\
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
      data: function() {
        return {
          experiments: [
            {
              expanded: false,
              title: 'Doe dit vooral thuis: magneet',
              requirements: [
               'Verfroerstaafje',
               'IJzerdraad',
               'Magneetjes',
               'Kleine batterijtjes',
              ],
              instructions:
                'Maak aan beide uiteinden van het roerstaafje een gaatje waar, \
                in een kleine boog, het ijzerdraad door heen kan. Buig het ijzerdraad, zoals \
                hierboven, aan het einde waar hij door het gaatje is gekomen om zodat hij stevig \
                blijft zitten. Hou de magneten aan de onderkant van het hout. Leg de batterij \
                boven op de magneet maar wel met het hout ertussen en voer het uit zoals \
                Geraldine hierboven voordoet!',
              img: 'img/exp1.gif',
              thumb: 'img/exp1.jpg',
            },
            {
              expanded: false,
              title: 'Doe dit vooral thuis: Haarlak-kanon',
              requirements: [
                'Haarlak',
                'Lege frisdrankfles (met klein gaat aan de onderkant)',
                'Keukenrol zonder papier (dus een keukenrolrol)',
                'Tape',
                'Lange aansteker',
                'Pingpongballetje',
              ],
              instructions:
                'Ja, je zult misschien denken: "Wow, die lijkt op het sinaasappelkanon?!" Klopt. \
                Maar deze is next level 2.0. Dikke ontsteker, gewoon die automatische knalmachine \
                dus. Maar laten we klein beginnen. Tape de keukenrol vast aan de bovenkant van de \
                fles. Tape het zo vast dat er geen luchtopeningen zijn en er geen lucht kan \
                ontsnappen. Doe vervolgens de pingpongbal in de koker en laat hem naar beneden \
                rollen tegen de rand van de opening van de fles. Mik van je af en richt absoluut \
                nooit op mensen, dieren of planten. Spuit een beetje haarlak in het gat onder de \
                fles en hou direct de aansteker erbij, ontvlam het vuur en PANG!',
              img: 'img/exp2.jpg',
              thumb: 'img/exp2b.jpg',
            },
            {
              expanded: false,
              title: 'Doe dit vooral thuis: Rijstfles',
              requirements: [
                'Leeg flesje (500ml)',
                'Rijst (sushirijst het liefst)',
                'Eetstokje',
                'Trechter',
              ],
              instructions:
                'Doe rijst soepel via een trechter in het flesje tot net boven het etiket. \
                Laat eerst zien door soepel de rijst in het flesje te duwen dat je hem daarna weer \
                kunt verwijderen. Vervolgens haal je het stokje eruit en stamp je met de bodem van \
                de fles tegen de tafel zodat de rijst zo ver mogelijk naar beneden zakt. Vervolgens \
                druk je opnieuw in een rechte lijn naar beneden het stokje stevig in de rijst, tot \
                het stokje niet meer verder kan. Als het goed is kun je via het stokje nu de hele \
                les optillen!',
              img: 'img/exp3b.jpg',
              thumb: 'img/exp3.jpg',
            },
          ],
        };
      },
      methods: {
        navigate: emitNavigationEvent,
        expand: function(i) {
          if (this.experiments[i].expanded) {
            this.experiments[i].expanded = false;
          } else {
            this.experiments[i].expanded = true;
          }
        },
      },
      template: '\
        <section class="diy-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">\
              <img class="back-button-icon" src="img/previous.svg"/>\
            </button>\
            <p class="top-bar-text">Doe het lekker zelf</p>\
          </section>\
          <section class="container">\
            <li\
              class="diy-story"\
              is="diy-story"\
              v-for="(experiment, index) in experiments"\
              v-bind:title="experiment.title"\
              v-bind:thumb="experiment.thumb"\
              v-bind:requirements="experiment.requirements"\
              v-bind:img="experiment.img"\
              v-bind:instructions="experiment.instructions"\
              v-bind:expanded="experiment.expanded"\
              v-on:expand="expand(index)"\
            ></li>\
          </section>\
        </section>',
    },

    questions: {
      data: function() {
        return {
          newQuestionText: '',
          newQuestionEmail: '',
          todos: [
            { points: 203, voted: false, text: 'Kan je een bekertje water vullen op z\'n kop?' },
            { points: 203, voted: false, text: 'Kan je pijn stillen zonder pil?' },
            { points: 174, voted: false, text: 'Kun je duiken zonder luchttank?' },
            { points: 140, voted: false, text: 'Kun je koken op het gas uit je eigen scheet?' },
            { points: 134, voted: false, text: 'Kun je een blackout verslaan als je weet dat hij komt?' },
            { points: 90, voted: false, text: 'Kun je met een bierfiets de Cauberg beklimmen?' },
            { points: 59, voted: false, text: 'Kun je over een rijdende auto heen rennen? ' },
            { points: 8, voted: false, text: 'Kun je je hersenen als afstandsbediening gebruiken?' },
            { points: 3, voted: false, text: 'Kun je bloedworst maken van je eigen bloed?' },
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
        newQuestion: function() {
          this.todos.push({ points: 1, voted: true, text: this.newQuestionText });
          this.newQuestionText = '';
          this.newQuestionEmail = '';
        },
        upvote: function(i) {
          if (!this.todos[i].voted) {
            this.todos[i].points++;
            this.todos[i].voted = true;
          } else {
            this.todos[i].points--;
            this.todos[i].voted = false;
          }
        },
        navigate: emitNavigationEvent,
      },
      template: '\
        <section class="questions-container">\
          <section class="top-bar">\
            <button v-on:click="navigate(\'home\')" class="back-button">\
              <img class="back-button-icon" src="img/previous.svg"/>\
            </button>\
            <p class="top-bar-text">Bezopen vragen</p>\
          </section>\
          <section class="container">\
            <h1 class="user-question-intro">\
              Heb jij ook een bezopen vraag?\
              Stel hem dan hier en wie weet wordt jouw vraag\
              beantwoord in de uitzending\
            </h1>\
            <input\
              class="user-question-input"\
              v-model="newQuestionEmail"\
              placeholder="Je e-mailadress"\
            >\
            <input\
              class="user-question-input"\
              v-model="newQuestionText"\
              placeholder="Je vraag"\
            >\
            <button class="button answer center" v-on:click="newQuestion">stel je vraag</button>\
          </section>\
          <section class="container">\
            <div id="todo-list-example">\
              <h1 class="user-question-intro">\
                Of stem op vragen van andere kijkers\
              </h1>\
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
