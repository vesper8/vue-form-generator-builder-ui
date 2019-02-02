<template>
  <div>
    <div
      :id="uniqueId"
      class="jsoneditor"
    />
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor';

export default {
  props: {
    mode: {
      type: String,
      default: () => 'export',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    importTo: {
      type: String,
      default: () => '',
    },
  },

  data() {
    return {
      editor: null,
    };
  },

  computed: {
    uniqueId() {
      return `jsoneditor-${new Date().getTime()}`;
    },
  },

  watch: {
    data: {
      handler(data) {
        this.editor.destroy();
        this.initEditor(data);
      },
      deep: true,
    },
  },

  mounted() {
    this.initEditor(this.data);

    Bus.$on('import_json', (importTo) => {
      if (this.mode === 'import' && this.importTo === importTo) {
        this.importJson();
      }
    });
  },

  beforeDestroy() {
    Bus.$off('import_json');
  },

  methods: {
    initEditor(data) {
      const container = document.getElementById(this.uniqueId);
      const options = {
        mode: 'text',
      };
      this.editor = new JSONEditor(container, options);
      this.editor.set(data);
    },

    importJson() {
      const json = this.editor.get();

      // console.log('schema', this.form.schema);
      // console.log('model', this.form.model);
      // console.log('json', this.editor.get());

      if (this.importTo === 'schema') {
        this.form.schema = json;
      } else if (this.importTo === 'model') {
        this.form.model = json;
      }
    },
  },
};
</script>

<style>
.jsoneditor textarea {
  height: 50vh;
}
</style>
