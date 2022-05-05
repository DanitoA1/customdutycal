<template>
  <v-container
    class="mx-auto"
  >
    <v-row>
      <v-col
        cols="6"
      >
        <v-btn
         class="mx-2 my-1"
         :color="TariffShow ? '' : '#FF8811'"
         @click="ShowRates"
         rounded
        >
          Rates
        </v-btn>
        <v-btn
         class="mx-2 my-1"
         :color="TariffShow ? '#FF8811' : ''"
         @click="ShowTariffs"
         rounded
        >
          Tariffs
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        :class="$vuetify.breakpoint.mdAndUp ? 'd-flex my-1' : ''"
      >
        <p
          :class="$vuetify.breakpoint.mdAndUp ? 'text-caption mx-2 my-2' : 'text-caption'"
        >
          Last Updated: {{dateTime}}
        </p>
        <v-btn
          to="/admin/update"
          :class="$vuetify.breakpoint.mdAndUp ? 'mx-2' : ''"
          color="#157F1F"
          rounded
        >
          Update
          <v-icon>mdi-upload  </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-card
      v-if="TariffShow"
    >
      <v-card-title>
        Tariffs
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
        :headers="Tariffheaders"
        :items="Tariffs"
        :search="search"
      ></v-data-table>
    </v-card>
    <v-card
      v-if="!TariffShow"
    >
      <v-card-title>
        Rates
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
        :headers="Rateheaders"
        :items="currency"
        :search="search"
        :loading="rates.length == 0"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import tarifflistArray from '@/tariff.json';
import { mapState } from 'vuex';

export default {
  name: 'Rates',
  data: () => ({
    search: '',
    TariffShow: false,
    Tariffheaders: [
      {
        text: 'HSCODE Description',
        align: 'start',
        sortable: false,
        value: 'Description',
      },
      { text: 'HSCODE', value: 'CET Code' },
      { text: 'SU', value: 'SU' },
      { text: 'ID', value: 'ID' },
      { text: 'VAT', value: 'VAT' },
    ],
    Rateheaders: [
      {
        text: 'Currency Name',
        align: 'start',
        sortable: false,
        value: 'Name',
      },
      { text: 'Currency Code', value: 'Code' },
      { text: 'Exchange rate ₦', value: 'Exchange rate' },
    ],
    Tariffs: [],
    Rates: [],
  }),
  computed: {
    ...mapState(['rates']),
    ...mapState(['tariffs']),
    currency() {
      return this.rates.rates;
    },
    dateTime() {
      const myDate = new Date(this.rates.createdOn.seconds * 1000);
      return myDate.toLocaleString();
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.importjson();
    this.getData();
  },
  methods: {
    importjson() {
      this.Tariffs = JSON.parse(JSON.stringify(tarifflistArray));
    },
    ShowRates() {
      this.TariffShow = false;
    },
    ShowTariffs() {
      this.TariffShow = true;
    },
    getData() {
      this.$store.dispatch('getCurrentRates');
      this.$store.dispatch('getCurrentTariffs');
    },
  },
};
</script>
