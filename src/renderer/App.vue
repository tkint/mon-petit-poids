<template>
  <v-app fixed>
	<v-toolbar class="orange" dark style="z-index: 5">
	  <v-toolbar-items style="position: fixed">
		<v-btn :to="{name: 'Home'}" class="orange darken-4" flat>
		  Home
		</v-btn>
	  </v-toolbar-items>
	  <v-spacer></v-spacer>
	  <v-toolbar-title class="v-btn--round orange darken-3 px-3 py-2">
		Mon Petit Poids
	  </v-toolbar-title>
	  <v-spacer></v-spacer>
	</v-toolbar>
	<router-view class="teal darken-3"></router-view>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'mon-petit-poids',
  methods: {
    ...mapActions({
      LOAD_STATE: 'LOAD_STATE',
    }),
  },
  beforeCreate() {
    this.$electron.ipcRenderer.send('loadState');
    this.$electron.ipcRenderer.on('state', (event, state) => {
      this.LOAD_STATE(state);
    });
  },
};
</script>

<style>
  /* CSS */
</style>
