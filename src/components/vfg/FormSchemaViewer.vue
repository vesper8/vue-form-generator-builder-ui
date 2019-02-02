<template>
  <div id="vfg-schema-viewer">
    <Debug
      :expanded="true"
      :force-show="true"
      label="Schema"
      :data="form.schema"
    />

    <Debug
      :force-show="true"
      label="Config"
      :data="form.fieldConfigurator"
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
        v-b-modal.import-json-schema
        variant="primary"
      >
        Import
      </b-button>
      &nbsp;
      <b-button
        v-b-modal.export-json-schema
        variant="primary"
      >
        Export
      </b-button>
    </b-button-group>

    <b-modal
      id="import-json-schema"
      ref="importJsonSchemaModal"
      title="Import Schema JSON"
    >
      <JsonEditor
        mode="import"
        :data="{}"
        :form="form"
        import-to="schema"
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
            @click="$refs.importJsonSchemaModal.hide();"
          >
            Cancel
          </b-button>
          &nbsp;
          <b-button
            size="sm"
            class="float-right"
            variant="primary"
            @click="importJson('schema'); $refs.importJsonSchemaModal.hide()"
          >
            Import
          </b-button>
        </b-button-group>
      </div>
    </b-modal>

    <b-modal
      id="export-json-schema"
      title="Export Schema JSON"
    >
      <JsonEditor
        mode="export"
        :data="form.schema"
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
      this.form.schema = {
        fields: [],
      };
    },
  },
};
</script>

<style>
#vfg-schema-viewer .buttons {
  height: 35px;
  position: absolute;
  top: 7px;
  right: 5px;
}

#vfg-schema-viewer .buttons .btn {
  height: 35px;
}

#vfg-schema-viewer .debug:nth-child(1) {
  position: absolute;
  left: 5px;
}

#vfg-schema-viewer .debug:nth-child(2) {
  position: absolute;
  left: 120px;
}
</style>
