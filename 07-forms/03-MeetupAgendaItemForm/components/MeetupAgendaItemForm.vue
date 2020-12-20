<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="removeClick">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select
        v-model="agendaItem_.type"
        @change="updateAgenda"
        class="form-control"
        title="Тип"
      >
        <option
          v-for="item in typesList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            v-model="agendaItem_.startsAt"
            @change="updateAgenda"
            class="form-control"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            v-model="agendaItem_.endsAt"
            @change="updateAgenda"
            class="form-control"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label v-if="agendaItem_.type === 'talk'" class="form-label">Тема</label>
      <label v-else-if="agendaItem_.type === 'other'" class="form-label">Заголовок</label>
      <label v-else class="form-label">Нестандартный текст (необязательно)</label>
      <input
        v-model="agendaItem_.title"
        @change="updateAgenda"
        class="form-control"
      />
    </div>
    <div v-if="agendaItem_.type === 'talk'" class="form-group">
      <label class="form-label">Докладчик</label>
      <input
        v-model="agendaItem_.speaker"
        @change="updateAgenda"
        class="form-control"
      />
    </div>
    <div v-if="agendaItem_.type === 'talk' || agendaItem_.type  === 'other'" class="form-group">
      <label class="form-label">Описание</label>
      <textarea
        v-model="agendaItem_.description"
        @change="updateAgenda"
        class="form-control"
      ></textarea>
    </div>
    <div v-if="agendaItem_.type === 'talk'" class="form-group">
      <label class="form-label">Язык</label>
      <select
        v-model="agendaItem_.language"
        @change="updateAgenda"
        class="form-control"
      >
        <option
          v-for="item in languagesList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      agendaItem_: { ...this.agendaItem },
    };
  },
  watch: {
    startTime(newValue, oldValue) {
      let oldStartMinutes = oldValue
        .split(':')
        .reduce((acc, value) => +acc * 60 + +value);
      let newStartMinutes = newValue
        .split(':')
        .reduce((acc, value) => +acc * 60 + +value);
      let oldEndsMinutes = this.agendaItem_.endsAt
        .split(':')
        .reduce((acc, value) => +acc * 60 + +value);
      let newEndMinutes =
        (oldEndsMinutes + (newStartMinutes - oldStartMinutes) + 24 * 60) %
        (24 * 60);
      let hours = (newEndMinutes / 60).toFixed(0);
      let minutes = newEndMinutes % 60;
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      this.agendaItem_.endsAt = `${hours}:${minutes}`;
    },
  },
  computed: {
    typesList() {
      return getAgendaItemTypes();
    },
    languagesList() {
      return getTalkLanguages();
    },
    startTime() {
      return this.agendaItem_.startsAt;
    },
  },
  methods: {
    removeClick() {
      this.$emit('remove');
    },
    updateAgenda() {
      this.$emit('update:agendaItem', { ...this.agendaItem_ });
    },
  },
};
</script>

<style></style>
