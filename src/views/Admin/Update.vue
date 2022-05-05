<!-- eslint-disable -->
<template>
  <v-container class="example-drag mx-auto">
  <v-dialog
      v-model="dialog"
      max-width="320"
      persistent
    >
      <v-card>
        <v-card-title
          class="justify-center"
        >Select File To Update</v-card-title>
        <v-card-actions
          class="justify-center"
        >
          <v-btn
            class="mx-2"
            color="#FF8811"
            @click="UploadRates"
            small
            rounded
          >
            Rates
          </v-btn>
          <v-btn
            class="mx-2"
            right
            color="#FF8811"
            @click="UploadTariffs"
            small
            rounded
          >
            Tariffs
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="d-flex justify-center mt-16 mb-8"
    >
      {{ FileType }}
      <v-btn
        class="ml-2"
        color="green"
        small
        rounded
        @click="dialog = true"
      >
        Change
      </v-btn>
    </div>
    <v-card 
      class="upload mt-3 mx-auto"
      max-width="800"
      elevation="8"
      min-height="300"
    >
      <v-card-title
        class="d-flex justify-center text-capitalize"
      >
        Select the file to be uploaded from your computer
      </v-card-title>
      <div
        class="d-flex justify-center my-10"
      >
        <input type="file" @change="loadTextFromFile" accept="csv">
      </div>
      <div
        class="d-flex justify-center"
      >
        <v-btn
          class="text-capitalize white--text"
          @click="testCode()"
          color="green"
          rounded
          :disabled="files.length == 0"
        >
          <div
            v-if="!loader"
          >
            Upload Now
          </div>
          <div
            v-else
          >
            <v-progress-circular
              indeterminate
              color="white"
            ></v-progress-circular>
          </div>
        </v-btn>
      </div>
    </v-card>
    <div
      v-if="!loader && rateStatus === 1"
    >
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        centered
        color="#3D2B3D"
      >
        {{ textSuccess }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

  </v-container>
</template>

<script>
// import FileUpload from 'vue-upload-component';
import tarifflistArray from '@/tariff.json';
import { mapState } from 'vuex';

export default {
  name: 'Update',
  components: {
    // FileUpload,
  },
  data: () => ({
    files: [],
    dialog: true,
    FileType: '',
    rates: [],
    tariffs: [],
    csv: {},
    snackbar: false,
    timeout: 4000,
    textSuccess: 'Update done successfully!!!',
    apiInstance: null,
  }),
  computed: {
    ...mapState(['rateStatus']),
    ...mapState(['loader']),
  },
  created() {
    this.getData();
    this.rateStatus = 0;
  },
  methods: {
    UploadRates() {
      this.FileType = 'Rate Upload';
      this.dialog = false;
    },
    UploadTariffs() {
      this.FileType = 'Tariff Upload';
      this.dialog = false;
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      this.files = file;
      const reader = new FileReader();

      reader.onload = (e) => {
        this.csv = e.target.result;
        console.log(this.csv);
      };
      reader.readAsText(file);
    },
    /* eslint-disable */
    testCode() {
      this.snackbar = true;
      const lines = this.csv.split('\n');
      const headers = lines[0].split(',');
      const result = [];
      for (let i = 1; i < lines.length - 1; i++) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          if(j == 2)
            {
              const floatValue = currentline[j].replace(/['"]+/g, '')
              obj[headers[j]] = parseFloat(floatValue);
            }
          else
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      if(this.FileType == 'Rate Upload')
        this.rates = result;
      else
        this.tariffs = this.importjson();
      this.uploadData();
    },
    /* eslint-enable */

    importjson() {
      return JSON.parse(JSON.stringify(tarifflistArray));
    },
    uploadData() {
      // send updated rates to firebase
      if (this.FileType === 'Rate Upload') {
        this.$store.dispatch('uploadRates', this.rates);
      } else {
        this.$store.dispatch('uploadTariffs', this.tariffs);
      }
    },
  },
};
</script>

<style scoped>
.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
.example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-drag .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
