export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left"
            @click="prevMonth"></button>
          <div>{{fullDate}}</div>
          <button class="rangepicker__selector-control-right"
            @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="singleDay in days" 
          :key="singleDay.index"
          :class="{'rangepicker__cell_inactive': singleDay.inactive}"
          class="rangepicker__cell">
            {{singleDay.day}}
            <a v-for="meetup in singleDay.meetups" 
              :key="meetup.id"
              class="rangepicker__event">{{meetup.title}}</a>
          </div>
      </div>
    </div>
  </div>`,

  data: () => {
    return {
      date: new Date(),
    };
  },

  computed: {
    meetupsMap() {
      const result = {};

      this.meetups.forEach((item) => {
        const dayID = new Date(item.date).toLocaleDateString();
        result[dayID] = result[dayID] || [];
        result[dayID].push(item);
      });

      return result;
    },
    fullDate() {
      const localeString = this.date.toLocaleString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });

      return localeString.replace(' г.', '');
    },
    firstDay() {
      return new Date(new Date(this.date).setDate(1));
    },
    days() {
      const currentMonth = this.date.getMonth();
      const firstDayOfMonth = this.firstDay.getDay();
      const firstDayOfGrid = new Date(this.firstDay).setDate(
        this.firstDay.getDate() - firstDayOfMonth,
      );
      let startDate = new Date(firstDayOfGrid);
      let hideEnd = false;

      return [...new Array(6 * 7)]
        .map((_, index) => {
          startDate.setDate(startDate.getDate() + 1);

          const inactive = startDate.getMonth() !== currentMonth;
          const dayID = startDate.toLocaleDateString();

          if (index > 0 && inactive && !(index % 7)) {
            hideEnd = true;
          }

          return {
            day: startDate.toLocaleString(navigator.language,{
              day: 'numeric',
            }),
            inactive,
            dayID,
            meetups: this.meetupsMap[dayID],
            hideEnd,
            index,
          };
        })
        .filter(({hideEnd}) => !hideEnd)
    },
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  methods: {
    prevMonth() {
      const currentMonth = this.firstDay.getMonth();

      this.date = new Date(new Date(this.firstDay).setMonth(currentMonth - 1));
    },
    nextMonth() {
      const currentMonth = this.firstDay.getMonth();

      this.date = new Date(new Date(this.firstDay).setMonth(currentMonth + 1));
    },
  },
};
