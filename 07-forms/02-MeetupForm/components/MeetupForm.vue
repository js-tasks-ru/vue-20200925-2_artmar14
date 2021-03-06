<template>
  <form
    class="form meetup-form"
    @submit.prevent="submitClick"
  >
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input
            class="form-control"
            v-model="data.title"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input
            class="form-control"
            type="date"
            v-model="date"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input
            class="form-control"
            v-model="data.place"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="data.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="data.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        class="mb-3"
        v-for="(item, index) in data.agenda"
        :key="item.id"
        :agenda-item="item"
        @update:agendaItem="($event) => updatedAgendaItem($event, index)"
        @remove="removedAgendaItem(index)"
      />

      <div class="form-section_append">
        <button
          type="button"
          data-test="addAgendaItem"
          @click="addAgendaItemClick"
        >
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="cancelClick"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem(startsAt = '00:00') {
  return {
    id: Math.random(),
    startsAt,
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function clone(item) {
  const clone = JSON.parse(JSON.stringify(item));
  return {
    ...clone,
    date: (clone.date || '').substr(0, 10),
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      required: false,
      default: 'Submit',
    },
  },

  data() {
    return {
      data: {},
    };
  },

  computed: {
    date: {
      get() {
        return (this.data.date || '').substr(0, 10);
      },
      set(value) {
        this.data.date = `${value}T00:00:00.000Z`;
      },
    },
  },

  watch: {
    meetup: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.data = clone(newValue);
      },
    },
  },

  methods: {
    cancelClick() {
      this.$emit('cancel');
    },
    submitClick() {
      this.$emit('submit', clone(this.data));
    },
    addAgendaItemClick() {
      const agendaCount = this.data.agenda.length;
      const lastAgendaItem = this.data.agenda[agendaCount - 1];
      const agendaItem = buildAgendaItem(
        lastAgendaItem ? lastAgendaItem.endsAt : undefined,
      );
      this.data.agenda.push(agendaItem);
    },
    updatedAgendaItem(newValue, index) {
      this.$set(this.data.agenda, index, newValue);
    },
    removedAgendaItem(index) {
      if (index < 0) return;
      this.data.agenda.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
