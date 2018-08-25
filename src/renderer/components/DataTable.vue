<template>
  <v-flex xs12>
	<v-dialog
		:width="300"
		v-model="dialog">
	  <v-btn
		  block
		  class="teal"
		  slot="activator">
		New Record
	  </v-btn>
	  <v-card>
		<v-card-title>
		  New Record
		</v-card-title>
		<v-card-text>
		  <v-form>
			<v-text-field
				v-model="record.date"
				label="Date">
			</v-text-field>
			<v-text-field
				v-model="record.weight"
				label="Weight">
			</v-text-field>
		  </v-form>
		</v-card-text>
		<v-card-actions>
		  <v-btn
			  block
			  class="teal"
			  @click="add()">
			Add
		  </v-btn>
		</v-card-actions>
	  </v-card>
	</v-dialog>
	<v-data-table
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
		  <v-edit-dialog
			  :return-value.sync="props.item.name"
			  lazy
			  @save="saveState"
			  @close="saveState">
			{{ props.item.date }}
			<v-text-field
				slot="input"
				v-model="props.item.date"
				label="Date"
				single-line>
			</v-text-field>
		  </v-edit-dialog>
		</td>
		<td>
		  <v-edit-dialog
			  :return-value.sync="props.item.name"
			  lazy
			  @save="saveState"
			  @close="saveState">
			{{ props.item.weight }} kg
			<v-text-field
				slot="input"
				v-model="props.item.weight"
				label="Date"
				single-line>
			</v-text-field>
		  </v-edit-dialog>
		</td>
		<td>
		  <v-btn
			  icon
			  class="red darken-1 elevation-2"
			  @click="remove(props.index)">
			<v-icon>delete</v-icon>
		  </v-btn>
		</td>
	  </template>
	</v-data-table>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DataTable',
  data() {
    return {
      record: {
        date: new Date().toLocaleDateString('fr-FR'),
        weight: null,
      },
      dialog: false,
      headers: [
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Weight', value: 'weight', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    orderedRecords() {
      return this.$store.getters.ORDERED_RECORDS(false);
    },
  },
  methods: {
    ...mapActions({
      saveState: 'saveState',
      addRecord: 'addRecord',
      removeRecord: 'removeRecord',
    }),
    add() {
      this.addRecord(this.record);
      this.dialog = false;
    },
    remove(index) {
      this.removeRecord(index);
    },
  },
};
</script>

<style scoped>

</style>