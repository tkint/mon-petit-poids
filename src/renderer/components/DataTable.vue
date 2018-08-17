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
		:items="records"
		hide-actions>
	  <template slot="no-data">
		<v-alert :value="true" color="error" icon="warning">
		  No data yet
		</v-alert>
	  </template>
	  <template slot="items" slot-scope="props">
		<td>{{ props.item.date }}</td>
		<td>{{ props.item.weight }}</td>
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
import { mapState, mapActions } from 'vuex';

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
        { text: 'Date', value: 'date' },
        { text: 'Weight', value: 'weight' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState({
      records: state => state.WeightManager.records,
    }),
  },
  methods: {
    ...mapActions({
      saveState: 'saveState',
      addRecord: 'addRecord',
      removeRecord: 'removeRecord',
    }),
    add() {
      this.addRecord(this.record);
      this.saveState(this.$electron.ipcRenderer);
      this.dialog = false;
    },
    remove(index) {
      this.removeRecord(index);
      this.saveState(this.$electron.ipcRenderer);
    },
  },
};
</script>

<style scoped>

</style>