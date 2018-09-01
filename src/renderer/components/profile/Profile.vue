<template>
  <v-layout row fill-height>
	<left-panel :profileId="profileId"></left-panel>
	<v-container fluid fill-height>
	  <v-layout row wrap>
		<v-flex xs6 class="pr-2">
		  <data-table :profileId="profileId"></data-table>
		</v-flex>
		<v-flex xs6>
		  <v-card class="teal darken-1">
			<v-card-text>
			  <line-chat
				  :chart-data="chartData"
				  :options="chartOptions">
			  </line-chat>
			</v-card-text>
		  </v-card>
		</v-flex>
	  </v-layout>
	</v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import LeftPanel from './LeftPanel';
import DataTable from './DataTable';
import LineChat from '../chartjs/LineChart';

export default {
  name: 'Profile',
  components: { LeftPanel, DataTable, LineChat },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      GET_PROFILE_BY_ID: 'GET_PROFILE_BY_ID',
    }),
    profileId() {
      return parseInt(this.$route.params.id, 10);
    },
    profile() {
      const profile = this.GET_PROFILE_BY_ID(this.profileId);
      if (this.profileId === -1) {
        this.$router.push({ name: 'Profile', params: { id: profile.id } });
      }
      return profile;
    },
    orderedRecords() {
      return this.$store.getters.ORDERED_RECORDS(this.profileId, true);
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
            borderColor: 'orange',
            animation: 0,
            borderWidth: 7,
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
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
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