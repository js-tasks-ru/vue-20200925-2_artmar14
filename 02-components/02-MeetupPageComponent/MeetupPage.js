import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div id="app">
      <meetup-view :meetup="rawMeetup"></meetup-view>
  </div>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      rawMeetup: {
        date: null,
        organizer: '',
        place: '',
        agenda: [],
      },
    };
  },

  mounted() {
    this.getMeetup();
  },

  methods: {
    async getMeetup() {
      this.rawMeetup = await fetchMeetup(MEETUP_ID);
    },
  },
};
