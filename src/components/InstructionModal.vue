<template>
  <div>
    <div @click="modalPop" class="instruction-button">
      HELP
    </div>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark style="background: #9B2D86;">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum aut nulla a asperiores,
            obcaecati harum rem provident laborum consequuntur, sed perferendis amet. Laboriosam
            sunt unde provident ea soluta amet voluptatum!
            <div class="ms-15 me-15 mt-5 mb-5">
              <div class="grid-container">
                <div class="div1">
                 One
                </div>
                <div class="div2">
                 Two
                </div>
                <div class="div3">
                 Three
                </div>
                <div class="div4">
                 Four
                </div>
                <div class="div5">
                 Five
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
      dialog: false,
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
.instruction-button {
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
  margin: 0 auto;
  div {
    background: black;
    padding: 45px;
  }
  // .div1{
  //   grid-column: 1 / 3;
  //   grid-row : 1 / 3;
  //   padding: 10px;
  //   border-radius: 12px;
  //   border: 1px solid #9b2d86;
  // }
}
</style>
