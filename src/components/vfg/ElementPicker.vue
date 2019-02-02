<template>
  <div
    id="element-picker"
    class="text-left"
  >
    <b-button
      v-for="(element, index) in vfgFields"
      :key="`vanilla-${index}`"
      variant="secondary"
      size="sm"
      @click="insertElement(element)"
    >
      {{ element.name }}
    </b-button>
    <br>
    <b-button
      v-for="(element, index) in vfgCustomFields"
      :key="`custom-${index}`"
      variant="warning"
      size="sm"
      @click="insertElement(element)"
    >
      {{ element.name }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      commonFieldProperties: {
        label: '',
        model: '',
        help: '',
        placeholder: '',
        fieldOptions: {},
      },

      vfgFields: [
        {
          name: 'Group',
          field: {
            type: 'group',
            legend: '',
            styleClasses: 'subgroup',
            tag: 'fieldset',
            fields: [],
          },
        },
        {
          name: 'Input',
          field: {
            type: 'input',
            fieldOptions: {
              inputType: 'text',
            },
          },
        },
        {
          name: 'Checkbox',
          field: {
            type: 'checkbox',
          },
        },
        {
          name: 'Radios',
          field: {
            type: 'radios',
            fieldOptions: {
              value: 'value',
              name: 'name',
            },
            values: [],
          },
        },
        {
          name: 'TextArea',
          field: {
            type: 'textArea',
            hint: 'Max 500 characters',
            fieldOptions: {
              max: 500,
              rows: 4,
            },
          },
        },
        {
          name: 'Checklist',
          field: {
            type: 'checklist',
            fieldOptions: {
              listBox: false,
            },
            values: [],
          },
        },
        {
          name: 'Switch',
          field: {
            type: 'switch',
            fieldOptions: {
              //   textOn: 'Female',
              //   textOff: 'Male',
              //   valueOn: 'female',
              //   valueOff: 'male',
            },
          },
        },
        {
          name: 'Select',
          field: {
            type: 'select',
            fieldOptions: {
              noneSelectedText: '',
            },
            values: [],
          },
        },
        {
          name: 'VueMultiSelect',
          field: {
            type: 'vueMultiSelect',
            fieldOptions: {
              multiple: false,
              // max: 4,
              // id:25,
              trackBy: 'name',
              label: 'name',
              searchable: true,
              clearOnSelect: true,
              hideSelected: true,
              // maxHeight:300,
              // allowEmpty:true,
              resetAfter: false,
              closeOnSelect: true,
              taggable: true,
              showPointer: true,
            },
            values: [],
          },
        },
      ],
      vfgCustomFields: [
        // custom fields
        {
          name: 'ToggleButton',
          custom: true,
          field: {
            type: 'toggle-button',
          },
        },
        {
          name: 'DateTime',
          custom: true,
          field: {
            type: 'datetime-picker',
          },
        },
        {
          name: 'Calendar',
          custom: true,
          field: {
            type: 'calendar',
          },
        },
        {
          name: 'Slider',
          custom: true,
          field: {
            type: 'slider-component',
          },
        },
      ],
    };
  },

  methods: {
    insertElement(element) {
      let schema;

      const commonFieldProperties = JSON.parse(JSON.stringify(this.commonFieldProperties));

      if (element.name === 'Group') {
        schema = JSON.parse(JSON.stringify(element.field));
      } else {
        schema = JSON.parse(JSON.stringify(Object.assign(commonFieldProperties, element.field)));
      }

      this.form.schema.fields.push(schema);

      this.form.fieldConfigurator.mounted = false;
      this.form.fieldConfigurator.field = this.form.schema.fields[this.form.schema.fields.length - 1];

      this.$nextTick(() => {
        this.form.fieldConfigurator.mounted = true;
      });
    },
  },
};
</script>

<style scoped>
#element-picker {
  margin-left: -5px;
}

#element-picker button.btn-sm {
  margin-bottom: 3px;
  padding: 0.03rem 0.3rem;
  font-size: 0.875rem;
  line-height: 1.4;
  border-radius: 0.2rem;
  display: block;
}
</style>
