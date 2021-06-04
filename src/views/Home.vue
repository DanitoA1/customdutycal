<template>
  <v-container
    class="fill"
    fluid
    style="
    background: #FCF4F8;
    "
  >
    <v-app-bar
      v-if="Admin"
      collapse
      absolute
      color="#9B2D86"
      dense
      clipped-right
    >
      <v-btn
        class="text-capitalize"
        text
        dark
        to="/admin"
      >
        Admin
      </v-btn>
    </v-app-bar>
    <div
      style="
      background: #fff;
      position: sticky;
      top: 0;
      z-index: 0;
      width: 100%;
      margin-bottom: 30px;
      "
    >
      <a href="https://www.valuehandlers.com/">
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
      </a>
    </div>
    <v-container
      v-if="rates.length == 0"
    >
      <div
        class="text-center"
      >
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
      </div>
    </v-container>
    <v-container
      v-else
    >
      <v-card
        v-if="calculated"
        class="mb-4 fixedTop"
        rounded="lg"
      >
        <v-container
          class="mb-0"
        >
          <v-row
            class="hidden-sm-and-down"
            no-gutters
          >
            <v-col></v-col>
            <v-spacer></v-spacer>
            <v-col
              cols="1"
            >
              <v-btn
                class="mb-n5"
                icon
                @click="closeCalculated"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-row
          class="hidden-sm-and-down"
        >
          <v-col
            class="ml-8"
          >
            <div>
              <p
                class="my-3 poppinsLight"
              >
                {{ textShow }}
              </p>
              <h3
                class="value font-weight-bold"
              >
                {{ outputCurrency }} {{ Total }}
              </h3>
              <p
                class="details"
                @click="detailsShow"
              >
                Show Result Details
                <v-btn
                  icon
                  color="#9B2D86"
                >
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </p>
            </div>
          </v-col>
          <v-col
            class="ml-4"
          >
            <p
              class="mt-3 poppinsLight"
            >
              SHOW RESULT IN CURRENCY
            </p>
            <v-autocomplete
              class="mr-4"
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
        <div
          class="hidden-md-and-up mx-10"
        >
          <div
            class="text-end"
          >
            <v-btn
              class="mt-n2"
              icon
              @click="closeCalculated"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
          <v-row>
            <v-col>
              <p
                class="mt-n2 poppinsLight"
              >
                {{ textShow }}
              </p>
            </v-col>
            <v-col
              cols="4"
              class="text-end"
            >
              <p
                class="mt-n4 ml-n3 font-weight-bold"
              >
                <v-autocomplete
                  v-model="outputCurrency"
                  @change="onCalculate()"
                  flat
                  solo
                  dense
                  :items="currency"
                  item-value="Code"
                  item-text="Code"
                ></v-autocomplete>
              </p>
            </v-col>
          </v-row>
          <div
            class="text-center mt-n9"
          >
            <h3
              class="value font-weight-bold"
            >
              {{ outputCurrency }} {{ Total }}
            </h3>
            <p
              class="details mb-6"
              @click="detailsShow"
            >
              Show Result Details
              <v-btn
                icon
                color="#9B2D86"
              >
                <v-icon>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </p>
          </div>
        </div>
        <div class="text-center mx-12">
          <v-btn
            class="poppinsBtn mt-n3 mb-8 white--text"
            color="#9B2D86"
            dark
            :width="$vuetify.breakpoint.mdAndUp ? '514' : '100%'"
            @click="generateReport()"
          >
            <v-icon
              class="mr-1"
            >mdi-printer</v-icon>
            PRINT RESULT
          </v-btn>
        </div>
      </v-card>
      <v-card
        v-if="showDetails"
        class="mb-4"
      >
        <v-container
          style="
          background-color: #F1D5E380;
          "
        >
          <div
            class="ml-6 mb-6"
          >
            <p
              class="details"
              @click="detailsHide"
            >
              Hide Result Details
              <v-btn
                icon
                color="#9B2D86"
              >
                <v-icon>
                  mdi-chevron-up
                </v-icon>
              </v-btn>
            </p>
          </div>
          <v-row
            no-gutters
            class="mb-n4"
          >
            <v-col
              class="mx-auto"
              cols="12"
              md="10"
            >
              <v-row>
                <v-col
                  :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center'"
                  cols="4"
                  md="4"
                >
                  <p
                    class="resultHeader"
                  >
                    Parameter
                  </p>
                </v-col>
                <v-col
                  :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center'"
                  cols="4"
                  md="6"
                >
                  <p
                    class="resultHeader"
                  >
                    Value
                  </p>
                </v-col>
                <v-col
                  :class="$vuetify.breakpoint.mdAndUp ? '' : 'text-center'"
                  cols="4"
                  md="2"
                >
                  <p
                    class="resultHeader"
                  >
                    Exclude
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row
            no-gutters
            class="mb-n4"
          >
            <v-col
              class="mx-auto"
              cols="10"
            >
              <v-row
                v-for="item in outPuts" :key="item.name"
              >
                <v-col
                  cols="4"
                >
                  <p
                    class="poppinsLight"
                  >
                    {{ item.caption }}
                  </p>
                </v-col>
                <v-col
                  cols="6"
                >
                  <p
                    class="poppinsLight"
                  >
                    {{ item.value }}
                  </p>
                </v-col>
                <v-col
                  cols="2"
                >
                  <v-switch
                    v-model="item.exclude"
                    class="mt-n2"
                    inset
                    dense
                    :disabled="!item.value"
                    @change="onExclude(item.name)"
                    color="green"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card
        class="mb-16"
        rounded="lg"
      >
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
        <v-divider></v-divider>
        <v-row
          no-gutters
          class="mx-3 mt-3"
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
                CURRENCY
              </v-col>
              <v-col
                cols="12"
              >
                <v-autocomplete
                  class="mr-md-5"
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
                <v-row
                  no-gutters
                >
                  <v-col>
                    <div
                      class="ml-md-5"
                    >
                      INSURANCE
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                    class="d-flex justify-end"
                  >
                    <v-switch
                      class="mt-n2 mr-n1"
                      inset
                      dense
                      v-model="insuranceInput"
                      color="green"
                    ></v-switch>
                    <v-tooltip
                      bottom
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="mt-n2"
                          small
                          color="black"
                          icon
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>
                            mdi-help-circle
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Switch between the use of insurance value and
                         insurance percentage</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  class="ml-md-5 mt-n3"
                  :label="insuranceInput ? 'Percentage' : 'Actual value'"
                  v-model="Insurance"
                  color="purple"
                  background-color="#F1D5E34D"
                  outlined
                  dense
                  :hint="insuranceInput ? 'Switch: Percentage' : 'Switch: Actual value'"
                  type="number"
                  min="0"
                  :max="insuranceInput ? '100' : ''"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
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
                FOB
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  class="mr-md-5"
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
                  FREIGHT
                </div>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  class="ml-md-5"
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
          </v-col>
        </v-row>
        <div class="text-center white--text mx-5">
          <v-btn
            class="mb-8 poppinsBtn white--text"
            color="#9B2D86"
            :width="$vuetify.breakpoint.mdAndUp ? '514' : '100%'"
            dark
            :loading="loading"
            @click="loader = 'loading'; onCalculate(); saveCalculation()"
          >Calculate</v-btn>
        </div>
      </v-card>
      <div
        class="text-center"
      >
        <v-btn
          class="mb-6"
          dark
          @click="logOut()"
        >
          Logout
        </v-btn>
      </div>
<instruction-modal />

    </v-container>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1100"
        filename="Result"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
      <section
        slot="pdf-content"
      >
        <!-- PDF Content Here -->
        <ResultCmp
          :result='outPuts'
          :hsCode='selectedHscode'
          :hsDescription='HsDescription'
          :itemDescription='itemDescription'
          :FOB='parseFloat(FOB)'
          :Freight='parseFloat(Freight)'
          :Insurance='parseFloat(InsuranceActual)'
          :importDuty='parseFloat(customDuty)'
          :sumTotal='parseFloat(sumTotal)'
          :inputCurrency='inputCurrency'
          :outputCurrency='outputCurrency'
        />
      </section>
    </vue-html2pdf>
  </v-container>
</template>

<script>
/* eslint-disable */
import csvToJson from 'convert-csv-to-json'
import firebase from 'firebase'
import jspdf from 'jspdf'
import ratelistArray from '@/rate.json'
import tarifflistArray from '@/tariff.json'
import ResultCmp from '@/components/ResultCmp.vue'
import VueHtml2pdf from 'vue-html2pdf'
import { mapState } from 'vuex';
import InstructionModal from '../components/InstructionModal.vue'

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
      showDetails: false,
      calculated: false,
      selectedHscode: null,
      selectedDescription: null,
      HsDescription: null,
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
      totalText: [ 'TOTAL IMPORT DUTY PAYABLE', 'TOTAL', 'INCLUDED TOTAL' ],
      textShow: 'TOTAL IMPORT DUTY PAYABLE',
      loader: null,
      loading: false,
      calculationDetails: [],
      Admin: false,
      outPuts: [
        {
          name: 'CIF (Sum of FOB, Insurance and Freight)',
          caption: 'CIF',
          value: 0,
          exclude: false,
        },
        {
          name: 'ID',
          caption: 'ID',
          value: 0,
          exclude: true,
        },
        {
          name: 'Surcharge',
          caption: 'Surcharge',
          value: 0,
          exclude: true,
        },
        {
          name: 'CISS (1% of FOB value)',
          caption: 'CISS',
          value: 0,
          exclude: true,
        },
        {
          name: 'ETLS (0.5% of CIF)',
          caption: 'ETLS',
          value: 0,
          exclude: true,
        },
        {
          name: 'VAT',
          caption: 'VAT',
          value: 0,
          exclude: true,
        },
      ],
    };
  },
  computed: {
    ...mapState(['rates']),
    ...mapState(['tariffs']),
  },
  created() {
    this.getDatas();
  },
  mounted() {
    this.importjson();
    firebase.auth().onAuthStateChanged(userAuth => {
            if (userAuth) {
              firebase
                .auth()
                .currentUser.getIdTokenResult()
                .then(tokenResult => {
                  if (tokenResult.claims.superAdmin || tokenResult.claims.admin) {
                    this.Admin = true;
                  } else {
                    this.Admin = false;
                  }
              });
            }
        });
  },
  components: {
    VueHtml2pdf,
    ResultCmp,
    InstructionModal
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push('/login');
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    getDatas() {
      this.$store.dispatch('getCurrentRates');
      this.$store.dispatch('getCurrentTariffs');
    },
    importjson() {
      this.tariff = JSON.parse(JSON.stringify(tarifflistArray));
      this.currency = JSON.parse(JSON.stringify(this.rates.rates));
    },
    saveCalculation() {
      this.$store.dispatch('saveCalculation', this.calculationDetails);
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

        if(this.insuranceInput === true) {
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

        if(this.insuranceInput === true) {
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

      /* let CISS = parseFloat(this.outPuts[0].value)*0.01;
      this.outPuts[3].value = CISS.toFixed(2); */

      let ID = parseFloat(this.outPuts[0].value)*m/100;
      this.outPuts[1].value = ID.toFixed(2);
      this.outPuts[1].name = `ID (${m}% of CIF for this Item)`;

      let Surcharge = ID*7/100;
      this.outPuts[2].value = Surcharge.toFixed(2);

      let ETLS = parseFloat(this.outPuts[0].value)*0.005;
      this.outPuts[4].value = ETLS.toFixed(2);
      
      let tot = (parseFloat(this.outPuts[0].value) + parseFloat(this.outPuts[3].value) + ID + Surcharge + ETLS);
      let vat = parseFloat(this.tariff[hsIndex].VAT);
      let VAT = 0;
      if (vat) {
        VAT = tot*0.075;
        this.outPuts[5].value = VAT.toFixed(2);
        this.outPuts[5].name = 'VAT (7.5% of CIF + ID + Surcharge + CISS + ETLS)'
      } else {
        VAT = tot*0;
        this.outPuts[5].value = VAT.toFixed(2);
        this.outPuts[5].name = 'VAT (0% VAT for this item)';
      }

      let total = tot + VAT;
      let C = total - parseFloat(this.outPuts[0].value);
      this.Total = total.toFixed(2);
      this.customDuty = C.toFixed(2);
      let Sum = parseFloat(this.outPuts[0].value) + C;
      this.sumTotal = Sum.toFixed(2);
      this.onExclude();
      this.calculated = true;
      this.calculationDetails = [{
        HSCODE: this.selectedHscode,
        HsDescription: this.HsDescription,
        itemDescription: this.itemDescription,
        FOB: this.FOB,
        Freight: this.Freight,
        Insurance: this.InsuranceActual,
        CustomDuty: this.customDuty,
        Total: this.sumTotal,
      }]
    },
    closeCalculated() {
      this.calculated = false;
    },
    detailsShow() {
      this.showDetails = true;
      window.scrollTo(0, 0);
    },
    detailsHide() {
      this.showDetails = false;
    },
    onExclude() {
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
       if(this.outPuts[i].exclude) {
         let T = parseFloat(this.Total) + parseFloat(this.outPuts[i].value);
         this.Total = T.toFixed(2);
         count++;
       }
       if(!this.outPuts[0].exclude && count == 5) {
         this.textShow = this.totalText[0];
       }else if(this.outPuts[0].exclude && count == 6) {
         this.textShow = this.totalText[1];
       }else {
         this.textShow = this.totalText[2];
       }
     }
      this.calculated = true;
    },
    generateReport () {
      window.scrollTo(0, 0);
      this.$refs.html2Pdf.generatePdf()
    },
    /* generatePDF() {
      const doc = new jspdf();
      const HsDescription = doc.splitTextToSize(this.HsDescription,120);
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
    }, */
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 500)

      this.loader = null
    },
    selectedHscode () {
      const hsIndex = this.tariff.findIndex((x) => x[ 'CET code' ] === this.selectedHscode);
      let m = this.tariff[hsIndex].Description;
      this.HsDescription = m;
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
  .poppinsBtn {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: white;
  }
  .poppinsLight {
    font-family: 'Poppins:300', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #2A0022;
  }
  .resultHeader{
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #2A0022;
  }
  .titlecolor {
    color: #d4af37;
  }
  .fill{
    margin: 0;
    padding: 0;
  }
  .value{
    color: goldenrod;
  }
  .details{
    color: #9B2D86;
  }
  .fixedTop {
    position: sticky;
    top: 125px;
    width: 100%;
    z-index: 2;
  }
  .v-text-field--outlined >>> fieldset {
    border-color: #F1D5E3;
  }
  .theme--light.v-divider {
    border-color: #D3AB634D !important;
  }
</style>
