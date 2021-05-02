<template>
  <v-container
    class="fill"
    fluid
    style="
    background: #FCF4F8;
    "
  >
    <div
      style="
      background: #fff;
      "
    >
      <div
        class="text-center"
      >
        <img
          height="75px"
          width="70px"
          src="/img/image 1.svg"
          alt="logo">
      </div>
      <div
        class="text-center"
      >
        <img
          height="40px"
          width="120"
          src="/img/valuehandlersLogo.png"
          alt="logo">
      </div>
    </div>
    <v-container>
      <v-card>
        <v-card-title
          class="justify-center poppins"
        >
          Duty Calculator
        </v-card-title>
        <v-row
          no-gutters
          class="mx-3"
        >
          <v-col
            cols="12"
            md="6"
          >
            <v-row
              no-gutters
              class="mx-2"
            >
              <v-col
                class="my-auto poppinsLight"
                cols="12"
              >
                HS-CODE
              </v-col>
              <v-col
                cols="12"
              >
                <v-autocomplete
                  class="mr-md-5"
                  background-color="#F1D5E34D"
                  label="HS-CODE"
                  color="purple"
                  outlined
                  dense
                  type="number"
                  min="0"
                  v-model="selectedHscode"
                  @change="onHscodeSelect()"
                  :items="tariff"
                  item-text="CET code"
                  item-value="CET code"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-row
              no-gutters
              class="mx-2"
            >
              <v-col
                class="my-auto poppinsLight"
                cols="12"
              >
                <div
                  class="ml-md-5"
                >
                  HSCODE Description
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <v-autocomplete
                  class="ml-md-5"
                  label="HS Description"
                  background-color="#F1D5E34D"
                  color="purple"
                  outlined
                  dense
                  v-model="selectedDescription"
                  @change="onDescSelect()"
                  :items="tariff"
                  item-text="Description"
                  item-value="CET code"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          class="mx-5"
        >
          <v-col
            class="mt-2 poppinsLight"
            cols="12"
          >
            Item Description
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              outlined
              color="purple"
              background-color="#F1D5E34D"
              v-model="itemDescription"
              dense
              label="Item Description"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            shaped
            :height="$vuetify.breakpoint.mdAndUp ? '580' : ''"
          >
            <v-row
              no-gutters
            >
              <v-col
                cols="6"
              >
                <v-card-title
                  class="poppins"
                >
                  Calculator
                </v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                class="mt-3 mr-3"
                cols="4"
              >
                <v-autocomplete
                  v-model="inputCurrency"
                  label="Currency"
                  background-color="#F1D5E34D"
                  color="purple"
                  outlined
                  dense
                  :items="currency"
                  item-value="Code"
                  item-text="Code"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-divider
              class="mt-n3"
            ></v-divider>
            <div
              class="mt-3"
            >
              <v-row
                class="mx-6"
                no-gutters
              >
                <v-col
                  class="my-2 poppinsLight"
                  cols="4"
                >
                  FOB
                </v-col>
                <v-col
                  cols="8"
                >
                  <v-text-field
                    label="FOB"
                    v-model="FOB"
                    color="purple"
                    background-color="#F1D5E34D"
                    outlined
                    dense
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row
                class="mx-6"
                no-gutters
              >
                <v-col
                  class="my-2 poppinsLight"
                  cols="4"
                >
                  Freight
                </v-col>
                <v-col
                  cols="8"
                >
                  <v-text-field
                    label="Freight"
                    v-model="Freight"
                    color="purple"
                    background-color="#F1D5E34D"
                    outlined
                    dense
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row
                class="mx-6"
                no-gutters
              >
                <v-col
                  class="my-2 poppinsLight"
                  cols="4"
                >
                  Insurance
                </v-col>
                <v-col
                  cols="8"
                >
                  <v-row
                    no-gutters
                  >
                    <v-col
                      cols="10"
                    >
                      <v-text-field
                        :label="insuranceInput ? 'Actual Value' : 'Percentage'"
                        v-model="Insurance"
                        color="purple"
                        background-color="#F1D5E34D"
                        outlined
                        dense
                        hint="Switch: % / Actual Value"
                        type="number"
                        min="0"
                        :max="insuranceInput ? '' : '100'"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="2"
                    >
                      <v-switch
                        v-model="insuranceInput"
                        class="my-1"
                        color="green"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div class="text-center">
                <v-btn
                  class="mb-6"
                  color="#9B2D86"
                  rounded="lg"
                  width="240"
                  dark
                  :loading="loading"
                  @click="loader = 'loading'; onCalculate()"
                >Calculate</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            shaped
            height="580"
          >
            <v-row
              no-gutters
            >
              <v-col>
                <v-card-title
                  class="poppins"
                >
                  Results
                </v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                class="mt-3 mr-3"
              >
                <v-autocomplete
                  v-model="outputCurrency"
                  @change="onCalculate()"
                  label="Currency"
                  background-color="#F1D5E34D"
                  color="purple"
                  outlined
                  dense
                  :items="currency"
                  item-value="Code"
                  item-text="Code"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-divider
              class="mt-n3"
            ></v-divider>
            <v-container
              class="mt-n4"
            >
            <v-simple-table
              style="
                background-color: #F1D5E34D;
              "
              light
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Parameter</th>
                    <th class="text-left">Value</th>
                    <th class="text-left">Exclude</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in outPuts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.value }}</td>
                    <td><v-switch
                      v-model="item.exclude"
                      :disabled="!item.value"
                      @change="onExclude(item.name)"
                      color="green"
                    ></v-switch></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            </v-container>
            <div class="text-center">
              {{ textShow }}: NGN {{ Total }}
            </div>
          </v-card>
        </v-col>
      </v-row>
      {{ dateTime }}
      <div class="text-center my-6">
        <v-btn
          color="#9B2D86"
          rounded
          dark
          width="240"
          @click="generatePDF"
        >
          <v-icon
            class="mr-1"
          >mdi-printer</v-icon>
          Print Result
        </v-btn>
      </div>
    </v-container>
  </v-container>
</template>

<script>
/* eslint-disable */
import csvToJson from 'convert-csv-to-json';
import jspdf from 'jspdf';
import ratelistArray from '@/rate.json';
import tarifflistArray from '@/tariff.json';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      tariff: [],
      file: [],
      dateTime: null,
      insuranceInput: false,
      selectedHscode: null,
      selectedDescription: null,
      outputCurrency: 'NGN',
      inputCurrency: null,
      currency: [],
      itemDescription: null,
      FOB: 0,
      Freight: 0,
      Insurance: 0,
      InsuranceActual: 0,
      Total: 0,
      customDuty: 0,
      sumTotal: 0,
      idPercent: 0,
      totalText: [ 'Custom Duty', 'Total', 'Selected Total' ],
      textShow: 'Custom Duty',
      loader: null,
      loading: false,
      outPuts: [
        {
          name: 'CIF',
          value: 0,
          exclude: true,
        },
        {
          name: 'ID',
          value: 0,
          exclude: false,
        },
        {
          name: 'Surcharge',
          value: 0,
          exclude: false,
        },
        {
          name: 'CISS',
          value: 0,
          exclude: false,
        },
        {
          name: 'ETLS',
          value: 0,
          exclude: false,
        },
        {
          name: 'VAT',
          value: 0,
          exclude: false,
        },
      ],
    };
  },
  mounted() {
    this.importjson();
  },
  methods: {
    importjson() {
      this.currency = JSON.parse(JSON.stringify(ratelistArray));
      this.tariff = JSON.parse(JSON.stringify(tarifflistArray));
    },
    onHscodeSelect() {
      this.selectedDescription = this.selectedHscode;
    },
    onDescSelect() {
      this.selectedHscode = this.selectedDescription;
    },
    onCalculate() {
      this.Total = 0;
      const F = parseFloat(this.FOB);
      const Fr = parseFloat(this.Freight);
      const I = parseFloat(this.Insurance);
      const CIF = 0;
      if(this.outputCurrency === 'NGN') {
        const CurrencyIndex = this.currency.findIndex((x) => x.Code === this.inputCurrency);
        let m = this.currency[CurrencyIndex][ 'Exchange rate (&#8358;)' ];

        let CISS = (F*0.01)*m;
        this.outPuts[3].value = CISS.toFixed(2);

        if(this.insuranceInput === false) {
          let A = F*I/100;
          let CIF = (F + Fr + parseFloat(A))*m;
          this.outPuts[0].value = CIF.toFixed(2);
          this.InsuranceActual = A.toFixed(2);
        }else{
          let A = I;
          let CIF = (F + Fr + I)*m;
          this.outPuts[0].value = CIF.toFixed(2);
          this.InsuranceActual = A.toFixed(2);
        }
      }else{
        const inputIndex = this.currency.findIndex((x) => x.Code === this.inputCurrency);
        const outputIndex = this.currency.findIndex((x) => x.Code === this.outputCurrency);
        let m = this.currency[inputIndex][ 'Exchange rate (&#8358;)' ];
        let n = this.currency[outputIndex][ 'Exchange rate (&#8358;)' ];

        let CISS = ((F*0.01)*m)/n;
        this.outPuts[3].value = CISS.toFixed(2);

        if(this.insuranceInput === false) {
          let A = F*I/100;
          let CIF = ((F + Fr + parseFloat(this.InsuranceActual))*m)/n;
          this.outPuts[0].value = CIF.toFixed(2);
          this.InsuranceActual = A.toFixed(2);
        }else{
          let A = I;
          let CIF = ((F + Fr + I)*m)/n;
          this.outPuts[0].value = CIF.toFixed(2);
          this.InsuranceActual = A.toFixed(2);
        }
      }

      const hsIndex = this.tariff.findIndex((x) => x[ 'CET code' ] === this.selectedHscode);
      let m = parseFloat(this.tariff[hsIndex].ID);
      this.idPercent = m.toFixed(1);
      let ID = parseFloat(this.outPuts[0].value)*m/100;
      this.outPuts[1].value = ID.toFixed(2);

      let Surcharge = ID*7/100;
      this.outPuts[2].value = Surcharge.toFixed(2);

      let ETLS = parseFloat(this.outPuts[0].value)*0.005;
      this.outPuts[4].value = ETLS.toFixed(2);

      let VAT = (parseFloat(this.outPuts[0].value) + parseFloat(this.outPuts[3].value) + ID + Surcharge + ETLS)*0.075;
      this.outPuts[5].value = VAT.toFixed(2);

      let total = VAT/0.075 - parseFloat(this.outPuts[0].value) + VAT;
      let C = VAT/0.075 - parseFloat(this.outPuts[0].value) + VAT;
      this.Total = total.toFixed(2);
      this.customDuty = C.toFixed(2);
      let Sum = parseFloat(this.outPuts[0].value) + C;
      this.sumTotal = Sum.toFixed(2);
    },
    onExclude(name) {
     /*const excludeIndex = this.outPuts.findIndex((x) => x.name === name);
     let m = parseFloat(this.outPuts[excludeIndex].value);
     if(this.outPuts[excludeIndex].exclude) {
       let total = parseFloat(this.Total) - m;
       this.Total = total.toFixed(2);
     }else {
        let total = parseFloat(this.Total) + m;
        this.Total = total.toFixed(2);
     }*/
     this.Total = 0;
     var i;
     var count = 0;
     for(i = 0; i < this.outPuts.length; i++) {
       if(!this.outPuts[i].exclude) {
         let T = parseFloat(this.Total) + parseFloat(this.outPuts[i].value);
         this.Total = T.toFixed(2);
         count++;
       }
       if(this.outPuts[0].exclude && count == 5) {
         this.textShow = this.totalText[0];
       }else if(!this.outPuts[0].exclude && count == 6) {
         this.textShow = this.totalText[1];
       }else {
         this.textShow = this.totalText[2];
       }
     }
    },
    generatePDF() {
      const doc = new jspdf();
      const hsIndex = this.tariff.findIndex((x) => x[ 'CET code' ] === this.selectedHscode);
      let m = this.tariff[hsIndex].Description;
      const HsDescription = doc.splitTextToSize(m,120);
      const Description = doc.splitTextToSize(this.itemDescription,120);
      const date = new Date();
      let dateTime = date;

      doc.setFontSize(30);
      doc.setTextColor(212,175,55);
      doc.text('ValueHandlers', 65, 25);
      doc.setFontSize(14);
      doc.text('12, Joseph Odunlami Street, Off Thomas Salako Street,', 42, 32);
      doc.text('Ogba Bus Stop, Ikeja, Lagos', 65, 38);
      doc.setFont('courier');
      doc.setTextColor(0);
      doc.setFontSize(14);
      doc.setFont('Courier-Bold');
      doc.text('HSCODE:', 15, 50);
      doc.setFont('courier');
      doc.text(this.selectedHscode, 65, 50);
      doc.setFont('Courier-Bold');
      doc.text('Item Description:', 15, 75);
      doc.setFont('courier');
      doc.text(Description, 65, 75);
      doc.setFont('Courier-Bold');
      doc.text('HSCODE Description:', 15, 60);
      doc.setFont('courier');
      doc.text(HsDescription, 65, 60);
      doc.setFontSize(25);
      doc.setTextColor(212,175,55);
      doc.setDrawColor(212,175,55);
      doc.text('Result', 75, 93);
      doc.setFontSize(12)
      doc.text(this.outputCurrency, 165, 91);
      doc.setLineWidth(1.5);
      doc.line(10, 85, 200, 85);
      doc.line(10, 95, 200, 95);
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.setFont('Courier-Bold');
      doc.text('FOB:', 30, 105);
      doc.text('Insurance:', 80, 105);
      doc.text('Freight:', 135, 105);
      doc.setFont('courier');
      doc.text(this.FOB, 60, 105);
      doc.text(this.InsuranceActual, 110, 105);
      doc.text(this.Freight, 165, 105);
      doc.text('CIF(Sum of FOB, Insurance and Freight)', 30, 115);
      doc.text(this.outPuts[0].value, 165, 115);
      doc.text('ID(' + this.idPercent + '% of CIF for this Item)', 30, 125);
      doc.text(this.outPuts[1].value, 165, 125);
      doc.text('Surcharge', 30, 135);
      doc.text(this.outPuts[2].value, 165, 135);
      doc.text('CISS(1% of FOB value)', 30, 145);
      doc.text(this.outPuts[3].value, 165, 145);
      doc.text('ETLS(0.5% of CIF)', 30, 155);
      doc.text(this.outPuts[4].value, 165, 155);
      doc.text('VAT(7.5% of CIF + ID + Surcharge + CISS + ETLS)', 30, 165);
      doc.text(this.outPuts[5].value, 165, 165);
      doc.setFontSize(12);
      doc.text('Custom Duty(sum of ID, Surcharge, CISS, ETLS, VAT)', 30, 185);
      doc.text(this.customDuty, 165, 185);
      doc.text('Sum Total(sum of CIF and custom duty)', 30, 200);
      doc.text(this.sumTotal, 165, 200)
      doc.setTextColor(255,0,0);
      doc.setFont('Courier-Bold');
      doc.setFontSize(10);
      doc.text('Rates used for this calculation are based on last updated value at 11:45am 15/09/2020', 30, 270);
      
      doc.autoPrint();
      doc.output('dataurlnewwindow');
    },
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 500)

      this.loader = null
    },
  },
};
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');
  .poppins {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #9B2D86;
  }
  .poppinsLight {
    font-family: 'Poppins:300', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #2A0022;
  }
  .titlecolor {
    color: #d4af37;
  }
  .fill{
    margin: 0;
    padding: 0;
  }
</style>
