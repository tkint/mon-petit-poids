<template>
  <v-navigation-drawer permanent app>
	<v-card>
	  <v-card-title>
		<h1>Mon Petit Poids</h1>
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
	</v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Profile',
  computed: {
    ...mapState({
      profile: state => state.WeightManager.profile,
    }),
  },
  watch: {
    profile: {
      handler() {
        this.saveState();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      saveState: 'saveState',
    }),
  },
};
</script>

<style scoped>

</style>