<template>
  <div>
    <button type="submit" class="btn btn-success"
          @click="generateReport();"
        >
          Get as pdf
        </button>
    <div>
     <vue-html2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="false"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="TextEditor_Content"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="700px"
        :html-to-pdf-options="getOptions()"

        @beforeDownload="beforeDownload($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
          <h1> {{ this.currentTextEditor.title }} </h1>
          <div v-html="this.currentTextEditor.text">-</div>
        </section>
    </vue-html2pdf>
   </div>
  </div>
</template>

<script>
import TextEditorDataService from "../services/TextEditorDataService";
import io from 'socket.io-client'
import VueHtml2pdf from 'vue-html2pdf';

export default {
  name: "textEditor",
  data() {
    return {
      currentTextEditor: "yes",
      message: '',
    };
  },
  created() {
    let socketUrl = 'https://jsramverk-editor-ersr20.azurewebsites.net';
    if (process.env.NODE_ENV == 'test') {
      socketUrl = 'http://localhost:8080';
    }
    console.log(socketUrl)
    this.socket = io(socketUrl)
    this.socket.emit('join-room', this.$route.params.id)
  },
  methods: {
    getTextEditor(id) {
      TextEditorDataService.get(id)
        .then(response => {
          this.currentTextEditor = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    async beforeDownload ({ html2pdf, options, pdfContent }) {
      await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i++) {
              pdf.setPage(i)
              pdf.setFontSize(10)
              pdf.setTextColor(150)
              pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
          }
      }).save()
    },
    getOptions() {
      return {
        margin: 10,
        filename: `TextEditor_Content.pdf`,
 
        image: {
            type: 'jpeg', 
            quality: 0.98
        },
    
        enableLinks: false,
    
        html2canvas: {
            scale: 1,
            useCORS: true
        },
      }
    }
  },
  mounted() {
    this.message = '';
    this.getTextEditor(this.$route.params.id);
    this.socket.on('str', (str, title) => {
      this.currentTextEditor.text = str;
      this.currentTextEditor.title = title;
    })
  },
  components: {
    VueHtml2pdf
  }
};
</script>

<style lang="css" scoped>

</style>
