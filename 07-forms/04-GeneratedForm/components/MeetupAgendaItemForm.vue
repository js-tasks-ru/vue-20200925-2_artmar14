<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="removeClick">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group label="Тип">
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="agendaItem_.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.startsAt"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="(item, idx) in fieldSpecification"
      :key="idx"
      :label="item.title"
    >
      <component
        :is="item.component"
        v-bind="item.props"
        :[item.model.prop]="agendaItem_[item.field]"
        @[item.model.event]="(value) => (agendaItem_[item.field] = value)"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
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
    agendaItem_: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.agendaItem_ });
      },
    },

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
    startTime() {
      return this.agendaItem_.startsAt;
    },
    fieldSpecification() {
      return this.$options.fieldSpecifications[this.agendaItem_.type];
    },
  },
  methods: {
    removeClick() {
      this.$emit('remove');
    },
  },
};
</script>

<style></style>
