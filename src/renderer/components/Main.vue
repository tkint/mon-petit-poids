<template>
  <v-container fluid>
	<v-layout row wrap>
	  <v-flex xs6>
		<data-table></data-table>
	  </v-flex>
	  <v-flex xs6>
		<line-chat
			:chart-data="chartData"
			:options="chartOptions">
		</line-chat>
	  </v-flex>
	</v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import DataTable from './DataTable';
import LineChat from './chartjs/LineChart';

export default {
  name: 'Main',
  components: { DataTable, LineChat },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      weightGoal: state => state.WeightManager.profile.weightGoal,
    }),
    orderedRecords() {
      return this.$store.getters.ORDERED_RECORDS(true);
    },
    minRecord() {
      return Math.min(...this.orderedRecords.map(record => record.weight));
    },
    maxRecord() {
      return Math.max(...this.orderedRecords.map(record => record.weight));
    },
    chartData() {
      const data = {
        labels: [],
        datasets: [
          {
            label: 'Weights',
            borderColor: 'teal',
            animation: 0,
            borderWidth: 4,
            fill: false,
            data: [],
          },
        ],
      };
      if (this.orderedRecords) {
        this.orderedRecords.forEach((record) => {
          data.labels.push(record.date);
          data.datasets[0].data.push(record.weight);
        });
      }
      return data;
    },
    chartOptions() {
      return {
        legend: {
          display: false,
        },
        animation: {
          duration: 0,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: this.minRecord - 5,
                suggestedMax: this.maxRecord + 5,
              },
            },
          ],
        },
      };
    },
  },
};
</script>

<style scoped>

</style>