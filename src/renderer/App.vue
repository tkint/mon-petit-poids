<template>
  <v-app dark>
	<profile></profile>
	<v-content>
	  <router-view></router-view>
	</v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Profile from '@/components/Profile';

export default {
  name: 'mon-petit-poids',
  components: { Profile },
  methods: {
    ...mapActions({
      loadState: 'loadState',
    }),
  },
  mounted() {
    this.$electron.ipcRenderer.send('loadState');
    this.$electron.ipcRenderer.on('state', (event, state) => {
      this.loadState(state);
    });
  },
};
</script>

<style>
  /* CSS */
</style>
