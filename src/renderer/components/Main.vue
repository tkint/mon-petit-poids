<template>
  <v-container fluid>
    <v-flex xs6>
      <data-table></data-table>
    </v-flex>
  </v-container>
</template>

<script>
import DataTable from './DataTable';

export default {
  name: 'Main',
  components: { DataTable },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>