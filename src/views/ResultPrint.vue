<template>
  <div>
    <div
      class="w3-container w3-teal text-center"
      id="printMe"
    >
      <h5>Footer</h5>
      <p>Footer information goes here</p>
    </div>
    <v-btn
      @click="generatePDF"
    >
      Testing
    </v-btn>
  </div>
</template>

<script>
import JsPDF from 'jspdf';

export default {
  methods: {
    generatePDF() {
      const Doc = new JsPDF();

      Doc.setFontSize(40);
      Doc.text('Octonyan loves jsPDF', 35, 25);

      // Set the document to automatically print via JS
      Doc.autoPrint();
      Doc.output('dataurlnewwindow');
    },
  },
};
</script>
