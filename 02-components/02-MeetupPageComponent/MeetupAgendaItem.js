import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="icon ? \`/assets/icons/icon-\${icon}.svg\` : '' " />
      </div>
      <div class="meetup-agenda__item-col">{{agendaItem.startsAt }} - {{ agendaItem.endsAt}}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{agendaItem.title ? agendaItem.title : title}}</h5>
        <template v-if="agendaItem.speaker">
        <p>
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{agendaItem.language}}</span>
        </p>
        </template>
        <p v-if="agendaItem.description">{{agendaItem.description}}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    icon() {
      return agendaItemIcons[this.agendaItem.type];
    },
    title() {
      return agendaItemTitles[this.agendaItem.type];
    },
  },
};
