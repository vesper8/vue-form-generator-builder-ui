<template>
  <div id="vfg-model-viewer">
    <Debug
      :expanded="true"
      :force-show="true"
      label="Model"
      :data="form.model"
    />

    <b-button-group class="buttons">
      <b-button
        variant="primary"
        @click="reset"
      >
        Reset
      </b-button>
      &nbsp;
      <b-button
        v-b-modal.import-json-model
        variant="primary"
      >
        Import
      </b-button>
      &nbsp;
      <b-button
        v-b-modal.export-json-model
        variant="primary"
      >
        Export
      </b-button>
    </b-button-group>

    <b-modal
      id="import-json-model"
      ref="importJsonModelModal"
      title="Import Model JSON"
    >
      <JsonEditor
        mode="import"
        :data="{}"
        :form="form"
        import-to="model"
      />
      <div
        slot="modal-footer"
        class="w-100 text-right"
      >
        <b-button-group>
          <b-button
            size="sm"
            class="float-right"
            variant="primary"
            @click="$refs.importJsonModelModal.hide();"
          >
            Cancel
          </b-button>
          &nbsp;
          <b-button
            size="sm"
            class="float-right"
            variant="primary"
            @click="importJson('model'); $refs.importJsonModelModal.hide();"
          >
            Import
          </b-button>
        </b-button-group>
      </div>
    </b-modal>
    <b-modal
      id="export-json-model"
      title="Export Model JSON"
    >
      <JsonEditor
        mode="export"
        :data="form.model"
      />
    </b-modal>
  </div>
</template>

<script>
export default {
  components: {
    Debug: () => import('@/components/Debug'),
    JsonEditor: () => import('@/components/JsonEditor'),
  },

  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    importJson(importTo) {
      Bus.$emit('import_json', importTo);
    },

    reset() {
      this.form.model = {};
    },
  },
};
</script>

<style>
#vfg-model-viewer .buttons {
  height: 35px;
  position: absolute;
  top: 7px;
  right: 5px;
}

#vfg-model-viewer .buttons .btn {
  height: 35px;
}

#vfg-model-viewer .debug {
  position: absolute;
  left: 5px;
}
</style>
