<template>
  <v-container fluid grid-list-lg>
	<v-layout row wrap>
	  <profile-item></profile-item>
	  <profile-item
		  v-for="(profile, index) in profiles"
		  :key="index"
		  :profile="profile">
	  </profile-item>
	</v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import ProfileItem from './ProfileItem';

export default {
  name: 'Home',
  components: { ProfileItem },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      profiles: state => state.WeightManager.profiles,
    }),
  },
};
</script>

<style scoped>

</style>