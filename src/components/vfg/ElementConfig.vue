<template>
  <div id="element-config">
    <FieldConfigurator
      v-if="form.fieldConfigurator.mounted && form.schema.fields.length > 0"
      :form="form"
      :field="form.fieldConfigurator.field"
    />
  </div>
</template>

<script>
/* eslint-disable default-case */

export default {
  components: {
    FieldConfigurator: () => import('@/components/vfg/FieldConfigurator'),
    // fieldInput: () => import('@/components/vfg/elements/Text'),
    // fieldCheckbox: () => import('@/components/vfg/elements/Checkbox'),
    // fieldRadios: () => import('@/components/vfg/elements/Radios'),
    // fieldTextArea: () => import('@/components/vfg/elements/Textarea'),
  },

  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    schemaToElement(schemaField) {
      let element;
      switch (true) {
        case schemaField.type === 'input' && schemaField.fieldOptions.inputType === 'text':
          element = 'fieldInput';
          break;
        case schemaField.type === 'checkbox':
          element = 'fieldCheckbox';
          break;
        case schemaField.type === 'radios':
          element = 'fieldRadios';
          break;
        case schemaField.type === 'textArea':
          element = 'fieldTextArea';
          break;
      }

      return element;
    },
  },
};
</script>

<style>
#element-config h3 {
  font-size: 15px;
}
</style>
