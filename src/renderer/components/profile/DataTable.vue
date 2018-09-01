<template>
  <v-flex xs12>
	<v-dialog
		:width="300"
		v-model="dialog">
	  <v-btn
		  dark
		  class="orange darken-1"
		  slot="activator">
		New Record
	  </v-btn>
	  <v-card dark class="teal darken-2">
		<v-card-title class="orange darken-1">
		  <v-flex xs12>
			<v-layout justify-center>
			  <h2>
				Add new record
			  </h2>
			</v-layout>
		  </v-flex>
		</v-card-title>
		<v-card-text>
		  <v-form>
			<v-text-field
				label="Date"
				color="orange"
				v-model="defaultRecord.date">
			</v-text-field>
			<v-text-field
				type="number"
				label="Weight"
				color="orange"
				v-model="defaultRecord.weight">
			</v-text-field>
		  </v-form>
		</v-card-text>
		<v-card-actions>
		  <v-btn
			  block
			  class="blue"
			  @click="add()">
			OK
		  </v-btn>
		</v-card-actions>
	  </v-card>
	</v-dialog>
	<v-data-table
		dark
		class="elevation-5"
		:headers="headers"
		:items="orderedRecords"
		hide-actions>
	  <template slot="no-data">
		<v-alert :value="true" color="error" icon="warning">
		  No data yet
		</v-alert>
	  </template>
	  <template slot="items" slot-scope="props">
		<td>
		  {{props.item.date}}
		</td>
		<td>
		  <v-edit-dialog
			  lazy
			  dark
			  :return-value.sync="props.item.name"
			  @save="SAVE_STATE"
			  @close="SAVE_STATE">
			{{ props.item.weight }} kg
			<v-text-field
				slot="input"
				color="orange"
				type="number"
				label="Weight"
				v-model="props.item.weight">
			</v-text-field>
		  </v-edit-dialog>
		</td>
		<td>
		  <v-btn
			  fab
			  flat
			  small
			  class="red darken-2 elevation-1"
			  @click="remove(props.item.id)">
			<v-icon>clear</v-icon>
		  </v-btn>
		</td>
	  </template>
	</v-data-table>
  </v-flex>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DataTable',
  props: ['profileId'],
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Weight', value: 'weight', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState({
      defaultRecord: state => state.WeightManager.defaultRecord,
    }),
    orderedRecords() {
      return this.$store.getters.ORDERED_RECORDS(this.profileId, false);
    },
  },
  methods: {
    ...mapActions({
      SAVE_STATE: 'SAVE_STATE',
      ADD_RECORD: 'ADD_RECORD',
      REMOVE_RECORD: 'REMOVE_RECORD',
    }),
    add() {
      this.ADD_RECORD(this.profileId);
      this.dialog = false;
    },
    remove(recordId) {
      this.REMOVE_RECORD({ profileId: this.profileId, recordId });
    },
  },
};
</script>

<style>
  .v-datatable {
	background: #00897b !important;
  }

  .v-datatable tr:hover {
	background: teal !important;
  }
</style>