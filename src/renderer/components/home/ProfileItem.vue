<template>
  <v-flex xs12 md4>
	<v-card
		dark
		hover
		class="teal"
		height="180px"
		:to="route">
	  <span v-if="profile">
		<v-card-title
			style="font-size: 50px">
		  {{profile.name}}
		</v-card-title>
		<v-card-text
			style="font-size: 20px">
		  {{profile.records.length}} records
		</v-card-text>
	  </span>
	  <span
		  v-else>
		<v-icon
			class="white--text text--lighten-1 text-xs-center plus-button">
		  add_circle_outline
		</v-icon>
	  </span>
	</v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'ProfileItem',
  props: ['profile'],
  computed: {
    route() {
      const profileId = (this.profile && this.profile.id) || -1;
      return { name: 'Profile', params: { id: profileId } };
    },
  },
};
</script>

<style scoped>
  .plus-button {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	font-size: 100px;
  }
</style>