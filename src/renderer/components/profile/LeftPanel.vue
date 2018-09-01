<template>
  <v-navigation-drawer class="teal">
	<v-card
		flat
		dark
		class="transparent">
	  <v-card-title>
		<h1>My Profile</h1>
	  </v-card-title>
	  <v-card-text>
		<v-form v-if="profile">
		  <v-text-field
			  label="Name"
			  color="orange"
			  v-model="profile.name">
		  </v-text-field>
		  <v-text-field
			  label="Height"
			  color="orange"
			  v-model="profile.height">
		  </v-text-field>
		  <v-text-field
			  readonly
			  label="Initial Weight"
			  color="orange"
			  v-if="profile.records && profile.records[0]"
			  :value="`${profile.records[0].weight} kg - ${profile.records[0].date}`">
		  </v-text-field>
		  <v-text-field
			  label="Weight Goal"
			  color="orange"
			  v-model="profile.weightGoal">
		  </v-text-field>
		  <v-text-field
			  label="Birthdate"
			  color="orange"
			  v-model="profile.birthDate">
		  </v-text-field>
		</v-form>
	  </v-card-text>
	  <v-card-actions>
		<v-btn
			block
			color="red darken-2"
			v-if="!deleteProfileConfirm"
			@click="deleteProfileConfirm = true">
		  Delete profile
		</v-btn>
		<v-flex xs12 v-else class="text-xs-center">
		  <v-layout row>
			<v-flex xs6>
			  <v-btn
				  color="red darken-2"
				  @click="deleteProfile">
				Confirm
			  </v-btn>
			</v-flex>
			<v-flex xs6>
			  <v-btn
				  color="blue"
				  @click="deleteProfileConfirm = false">
				Cancel
			  </v-btn>
			</v-flex>
		  </v-layout>
		</v-flex>
	  </v-card-actions>
	</v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LeftPanel',
  props: ['profileId'],
  data() {
    return {
      deleteProfileConfirm: false,
    };
  },
  computed: {
    ...mapGetters({
      GET_PROFILE_BY_ID: 'GET_PROFILE_BY_ID',
    }),
    profile() {
      return this.GET_PROFILE_BY_ID(this.profileId);
    },
  },
  watch: {
    profile: {
      handler() {
        this.SAVE_STATE();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      SAVE_STATE: 'SAVE_STATE',
      REMOVE_PROFILE: 'REMOVE_PROFILE',
    }),
    deleteProfile() {
      this.REMOVE_PROFILE(this.profileId);
      this.deleteProfileConfirm = false;
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>

</style>