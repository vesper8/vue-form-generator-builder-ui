<template>
  <div
    id="vfg-schema-builder"
    class="grid2x2"
  >
    <div class="box box1">
      <div class="h-100">
        <FormBuilder :form="form" />
      </div>
    </div>
    <div class="box box2">
      <div>
        <div>
          <b-button
            variant="primary"
            style="height:35px; position: absolute; top: 7px; right: 5px;"
            @click="formModalShow = !formModalShow"
          >
            Modal
          </b-button>
          <b-button
            v-b-modal.export-json-form
            variant="primary"
          >
            Export
          </b-button>

          <b-modal
            id="form-renderer-modal"
            v-model="formModalShow"
            size="lg"
            title="Modal"
          >
            <div slot="modal-header" />
            <FormRenderer
              v-if="formModalShow"
              :form="form"
            />
            <div slot="modal-footer" />
          </b-modal>

          <b-modal
            id="export-json-form"
            title="Export Form JSON"
          >
            <JsonEditor
              mode="export"
              :data="formattedForm"
            />
          </b-modal>
        </div>

        <FormRenderer
          v-if="!formModalShow"
          :form="form"
        />
      </div>
    </div>
    <div class="box box3">
      <div>
        <FormSchemaViewer :form="form" />
      </div>
    </div>
    <div class="box box4">
      <div>
        <FormModelViewer :form="form" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    FormBuilder: () => import('@/components/vfg/FormBuilder'),
    FormRenderer: () => import('@/components/vfg/FormRenderer'),
    FormSchemaViewer: () => import('@/components/vfg/FormSchemaViewer'),
    FormModelViewer: () => import('@/components/vfg/FormModelViewer'),
    JsonEditor: () => import('@/components/JsonEditor'),
  },

  data() {
    return {
      formModalShow: false,
      form: {
        fieldConfigurator: {
          // values related to currently configurable field
          mounted: false,
          rootSchemaIndex: -1, // field index in root fields
          groupSchemaIndex: -1, // current field index in group fields
          currentGroupRootSchemaIndex: -1, // index of current group (if any) in root group type fields
          field: {}, // currently configurable field
        },
        model: {},
        schema: {
          fields: [],
        },
      },
    };
  },

  computed: {
    formattedForm() {
      return {
        schema: this.form.schema,
        model: this.form.model,
      };
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

#vfg-schema-builder.grid2x2 {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

#vfg-schema-builder.grid2x2 > div {
  display: flex;
  flex-basis: calc(50%);
  justify-content: top;
  flex-direction: column;
}

#vfg-schema-builder.grid2x2 > div > div {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

#vfg-schema-builder .box {
  height: 50vh;
  overflow: auto;
  outline: inset thin;
  position: relative;
}

#form-renderer-modal #vfg-render {
  max-width: 60vw;
  margin: 0 auto;
}
</style>
