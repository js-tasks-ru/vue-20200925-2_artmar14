<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',

  components: { MeetupsView },

  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    };
  },

  watch: {
    view() {
      this.buildRoute();
    },
    date() {
      this.buildRoute();
    },
    participation() {
      this.buildRoute();
    },
    search() {
      this.buildRoute();
    },
    $route: {
      handler: function () {
        this.view = this.$route.query.view || 'list';
        this.date = this.$route.query.date || 'all';
        this.participation = this.$route.query.participation || 'all';
        this.search = this.$route.query.search || '';
      },
      immediate: true,
    },
  },

  methods: {
    buildRoute() {
      this.$router
        .push({
          path: '/',
          query: this.buildQuery(),
        })
        .catch((error) => {
          if (error.name !== 'NavigationDuplicated') throw error;
        });
    },
    buildQuery() {
      let query = Object.assign({}, this.$data);
      if (this.view === 'list') delete query.view;
      if (this.date === 'all') delete query.date;
      if (this.participation === 'all') delete query.participation;
      if (this.search === '') delete query.search;
      return query;
    },
  },
};
</script>

<style scoped></style>
