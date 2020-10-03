import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
    return `${API_URL}/images/${meetup.imageId}`;
}

async function getMeetup() {
  let response = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);
  return await response.json();
}
/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetup: {
      date: null,
      title: null,
    },
  },

  mounted() {
    this.fetchMeetup();
  },

  computed: {
    cover() {
       if (Object.prototype.hasOwnProperty.call(this.meetup,'imageId')) {
         return getMeetupCoverLink(this.meetup);
      } else {
         return false;
      }
    },

    readableDate() {
      return {
        localDate: new Date(this.meetup.date).toLocaleString(navigator.language, {
          year:  'numeric',
          month: 'long',
          day:   'numeric',
        }),
        ISODate: new Date(this.meetup.date).toISOString().substr(0, 10),
      };
    },
  },

  methods: {
    async fetchMeetup() {
      this.meetup = await getMeetup();
    },
  },

  icons: agendaItemIcons,

  titles: agendaItemTitles,
});
