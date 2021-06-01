<template>
  <div>
    <div @click="modalPop" class="instruction-button">
      Help
    </div>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark style="background: #9B2D86;">
              <div>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-toolbar>
            <div class="title text-center mt-10">
              Calculate Customs Duty - Nigeria No 1 Duty Calculator Software | Valuehandlers
            </div>
            <div class="ms-15 me-15 mt-5 mb-5">
              <div class="grid-container">
                <div class="div1 ">
                  <img src="../assets/Frame.svg" alt="search" />
                  <h4 class="mt-5">
                    1. DESCRIPTION
                  </h4>
                  <p>
                    On the click of a button, the software, accurately and in a matter of
                    milliseconds calculates customs duty payable to the Nigeria Customs by simply
                    providing import details.
                  </p>
                </div>
                <div class="div2">
                  <img src="../assets/Outline.svg" alt="search" />
                  <h4 class="mt-5">
                    2. CONTENT
                  </h4>
                  <p>
                    Use Nigeria first and No 1 Custom duty calculator software to calculate total
                    import duty payable to the Nigerian Customs Service for all imports, from any
                    country to Nigeria. With Valuehandlers Custom duty calculator, you are able to
                    estimate all taxes, levies and duties to be paid on your imported items and
                    cargo. Use your HS code, CIF, FOB to calculate the payable import duty of your
                    importation. Import duty is a compulsory tax collected on imports by the customs
                    office of any country. The nature, value and a country's need either for the
                    need of the product or to protect the domestic industry often dictates the
                    percentage of import charged on goods.
                  </p>
                </div>
                <div class="div3">
                  <img src="../assets/settings-1.svg" alt="search" />
                  <h4 class="mt-5">
                    3. FEATURES
                  </h4>
                  <p>Features and Benefits of Valuehandlers Duty Calculator</p>
                  <p>
                    Valuehandlers Custom duty calculator is user friendly, fast, efficient and
                    reliable. You can access the import duty calculator through Valuehandlers
                    official website: www.valuehandlers.com Below are some of the features of
                    Valuehandlers Import Duty Calculator:
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    It is user friendly: It is very easy to navigate and understand the different
                    app features.
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    It is fast: In a matter of milliseconds after input ting your data and figures,
                    you get an accurate value as your import duty.
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    No special skill required: You don’t need any special skills or knowledge to
                    navigate and operate the features of the software.
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    Easy access to the data: The data you need to ge t your import duty is not far
                    fetched, it is somethi ng you can easily get through the customs portal and
                    information on your shipment; HS code (Har monized System Code), CIF
                    (Cost,Insurance and Freight value), and FOB (Freight on Board i.e the total cost
                    of the cargo)
                  </p>
                </div>
                <div class="div4">
                  <img src="../assets/growth.svg" alt="search" />
                  <h4 class="mt-5">
                    4. BENEFITS
                  </h4>
                  <p>
                    Enjoy the following benefit when you use our Import Duty Calculator; No login is
                    needed for now Instant results: Total customs duty payable is generated
                    instantaneously. Free and unlimited usage Reserved right of privacy: Details of
                    your shipment are not cap tured or stored. Full Meaning of Common Acronyms on
                    The Import Duty Calculation
                  </p>
                </div>
                <div class="div5">
                  <h4 class="mt-5">
                    5. ACCRONYM
                  </h4>
                  <p>
                    Find the full meaning of common acronyms in used while calculating Import Duty:
                  </p>
                  <p>
                    FOB: Freight on board CIF: Cost-Insurance-Freight ELTS: ECOWAS Liberalization
                    Trade Scheme CISS: Comprehensive Import Supervision Scheme
                  </p>
                </div>
                <div class="div6">
                  <img src="../assets/calculator.svg" alt="search" />
                  <h4 class="mt-5">
                    How to calculate Import Duty
                  </h4>
                  <p>
                    Here is the formula for the calculation of import duty in Nigeria with their
                    appropriate percentage.
                  </p>
                  <p>
                    Custom Duty x% (Solely determined on the nature and description of the item by
                    the Nigerian Customs Service)
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    ELTS 0.5% on CIF
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    Sur-changes 7% on duty
                  </p>
                  <p>
                    <v-icon color="pink darken-4">mdi-checkbox-marked-circle</v-icon>
                    CISS 1% on FOB
                  </p>
                  <p>
                    VAT 7.5% on the above plus the CIF.
                  </p>
                </div>
                <div class="div7">
                  Valuehandlers International Limited is evolving with technology advancement; we,
                  therefore, present to you our easy to use import duty calculator. We are capable
                  and responsive to ship for you. Where are your shipments? Let’s ship for you.
                  Call: 08032241768 or send a mail to
                  <span style="color: #9b2d86;">info@valuehandlers.com</span>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Test',

  data() {
    return {
      dialog: true,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },

  methods: {
    modalPop() {
      this.dialog = !this.dialog;
    },
  },
};
</script>
<style lang="scss" scoped>
:root {
  --primary: #9b2d86;
}
.instruction-button {
  transition: 0.7s;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 60px;
  width: 60px;
  padding: 6px;
  border-radius: 50px;
  display: grid;
  place-content: center;
  background: #9b2d86;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 0 35px rgb(209, 119, 172);
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(200px, auto);
  max-width: 70%;
  margin: 15px auto;
  padding: 15px 0;
  img {
    height: 50px;
  }

  .div1 {
    grid-column: 1 / 3;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
  }
  .div2 {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
  }
  .div3 {
    grid-column: 1 / 3;
    grid-row: 2 / 5;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
  }
  .div4 {
    grid-column: 3 / 5;
    grid-row: 3 / 4;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
  }
  .div5 {
    grid-column: 3 / 5;
    grid-row: 4 / 5;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
  }
  .div6 {
    grid-column: 1 / 3;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
  }
  .div7 {
    grid-column: 3 / 5;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid #9b2d86;
    place-content: center;
  }
  h4 {
    color: #9b2d86;
  }
}
@media screen and (max-width: 960px) {
  .grid-container {
    max-width: 90%;
    margin: 15px 10px;
  }
}
@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-width: max-content;
    margin: 15px 10px;
    h4 {
      font-size: 15px;
    }
    img {
      height: 35px;
    }
    .div1,
    .div2,
    .div3,
    .div4,
    .div5,
    .div6,
    .div7 {
      grid-column: 1 / -1;
      grid-row: span 1;
    }
  }
  .instruction-button {
    height: 40px;
    width: 40px;
    padding: 10px;
    transition: 0.7s;
    font-size: 14px;
  }
}
</style>
