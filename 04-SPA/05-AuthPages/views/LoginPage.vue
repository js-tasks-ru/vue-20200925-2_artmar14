<template>
  <form class="form"
        @submit.prevent="submitLogin">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email"
               placeholder="demo@email"
               v-model="email"
               class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password"
               placeholder="password"
               class="form-control"
               v-model="password"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: null,
      password: null,
    };
  },

  methods: {
    async submitLogin() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      const { statusCode, message, fullname } = await login(
        this.email,
        this.password,
      );
      alert(fullname);
      if (statusCode >= 400) {
        alert(message || 'some error');
      }
    },
  },
};
</script>

<style scoped></style>
