<template>
  <v-navigation-drawer permanent app>
	<v-card>
	  <v-card-title>
		WeightManager
	  </v-card-title>
	  <v-card-text>
		<v-form v-if="profile">
		  <v-text-field
			  label="Name"
			  v-model="profile.name">
		  </v-text-field>
		  <v-text-field
			  label="Height"
			  v-model="profile.height">
		  </v-text-field>
		  <v-text-field
			  label="Initial Weight"
			  v-if="profile.weights"
			  v-model="profile.weights[0]">
		  </v-text-field>
		  <v-text-field
			  label="Weight Goal"
			  v-model="profile.weightGoal">
		  </v-text-field>
		  <v-text-field
			  label="Birthdate"
			  v-model="profile.birthDate">
		  </v-text-field>
		</v-form>
	  </v-card-text>
	  <v-card-actions>
		<v-btn class="teal" block @click="save">Save</v-btn>
	  </v-card-actions>
	</v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      profile: state => state.WeightManager.profile,
    }),
  },
  methods: {
    ...mapActions({
      saveState: 'saveState',
    }),
    save() {
      this.saveState(this.$electron.ipcRenderer);
    },
  },
};
</script>

<style scoped>

</style>