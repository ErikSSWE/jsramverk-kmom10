<template>
  <div v-if="currentTextEditor" class="edit-form">
    <h4>TextEditor</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTextEditor.title"
        />
      </div>
      <div class="form-group">
        <label for="text">Text</label>
        <ckeditor :editor="editor" v-model="currentTextEditor.text" :config="editorConfig"></ckeditor>
      </div>
    </form>

    <button class="btn btn-warning"
      v-if="currentTextEditor.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>

    <button class="btn btn-danger"
      @click="deleteTextEditor"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-warning"
      @click="updateTextEditor();"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a TextEditor...</p>
  </div>
</template>

<script>
import TextEditorDataService from "../services/TextEditorDataService";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import io from 'socket.io-client'

export default {
  name: "textEditor",
  data() {
    return {
      currentTextEditor: null,
      message: '',
      editor: ClassicEditor,
        editorData: "<p> test </p>",
        editorConfig: {
            // The configuration of the editor.
        },
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
    /*updatePublished(status) {
      var data = {
        id: this.currentTextEditor.id,
        title: this.currentTextEditor.title,
        text: this.currentTextEditor.text,
        published: status
      };

      TextEditorDataService.update(this.currentTextEditor.id, data)
        .then(response => {
          this.currentTextEditor.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },*/

    updateTextEditor() {
      this.socket.emit('get-text', this.currentTextEditor.text, this.currentTextEditor.title, this.currentTextEditor.id)
      TextEditorDataService.update(this.currentTextEditor.id, this.currentTextEditor)
        .then(response => {
          console.log(response.data);
          this.message = 'The textEditor was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTextEditor() {
      TextEditorDataService.delete(this.currentTextEditor.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "textEditors" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTextEditor(this.$route.params.id);
    this.socket.on('str', (str, title) => {
      this.currentTextEditor.text = str;
      this.currentTextEditor.title = title;
    })
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
