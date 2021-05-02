<template>
  <v-container
    class="mx-auto"
  >
    <v-card>
      <v-card-title>
        Recent Calculations
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="results"
        :search="search"
        :loading="results.length == 0"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Overview',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'User Email',
        align: 'start',
        sortable: false,
        value: 'userEmail',
      },
      { text: 'Item Description', value: 'result[0].HsDescription' },
      { text: 'Custom duty', value: 'result[0].CustomDuty' },
      { text: 'Total Cost', value: 'result[0].Total' },
    ],
    Calculations: [],
    results: [],
  }),
  created() {
    this.results = [];
    firebase
      .firestore()
      .collection('calculations')
      .orderBy('createdOn', 'desc')
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          const result = doc.data();
          this.results.push(result);
        });
      });
  },
};
</script>
