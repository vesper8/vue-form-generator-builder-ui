<template>
  <div id="field-configurator">
    <!-- label or legend -->
    <b-form-group
      v-if="field.type === 'group'"
      description="Type a legend for your group"
      :label="`Type: ${field.type}`"
    >
      <b-form-input
        v-model="field.legend"
        :placeholder="`${field.type} legend`"
      />
    </b-form-group>
    <b-form-group
      v-else
      description="Type a label for your field"
      :label="`Type: ${field.type}`"
    >
      <b-form-input
        v-model="field.label"
        :placeholder="`${field.type} label`"
      />
    </b-form-group>
    <!-- label or legend -->

    <!-- group dropdown -->
    <b-form-group v-if="field.type !== 'group'">
      <template v-if="groups.length > 0">
        <!-- {{ groups }} -->
        <select
          class="group-picker form-control custom-select"
          @input="onGroupSelected($event, field)"
        >
          <option
            value="-1"
            :selected="form.fieldConfigurator.currentGroupRootSchemaIndex == -1 ? 'selected' : ''"
          >
            No group
          </option>
          <option
            v-for="(group, index) in groups"
            :key="index"
            :value="group.groupRootSchemaIndex"
            :selected="form.fieldConfigurator.currentGroupRootSchemaIndex == group.groupRootSchemaIndex ? true : false"
          >
            {{ group.legend }}
          </option>
        </select>
      </template>

      <template v-for="(fieldBoolean, index) in fieldBooleans">
        <b-form-checkbox
          v-if="field.hasOwnProperty(fieldBoolean)"
          :key="index"
          v-model="field[fieldBoolean]"
        >
          {{ fieldBoolean }}
        </b-form-checkbox>
      </template>
    </b-form-group>
    <!-- group dropdown -->

    <!-- field boolean options -->
    <b-form-group v-if="field.type !== 'group'">
      <template v-for="(fieldOptionsBoolean, index) in fieldOptionsBooleans">
        <b-form-checkbox
          v-if="field.fieldOptions.hasOwnProperty(fieldOptionsBoolean)"
          :key="index"
          v-model="field.fieldOptions[fieldOptionsBoolean]"
        >
          {{ fieldOptionsBoolean }}
        </b-form-checkbox>
      </template>
    </b-form-group>
    <!-- field boolean options -->

    <!-- value insertor (for field types that support a values array) -->
    <template v-if="field.values">
      <b-form-group>
        <b-button
          variant="primary"
          @click="addValue()"
        >
          Add Value(s)
        </b-button>
      </b-form-group>

      <b-form-group>
        <b-input-group
          v-for="(item, index) in field.values"
          :key="index"
        >
          <b-input-group-text slot="append">
            <strong
              class="text-danger"
              @click="removeValue(index)"
            >
              <i class="far fa-window-close" />
            </strong>
          </b-input-group-text>
          <b-form-input
            v-model="field.values[index].name"
            @keyup.native="updateValue($event, index)"
          />
        </b-input-group>
      </b-form-group>
    </template>
    <!-- value insertor (for field types that support a values array) -->
  </div>
</template>

<script>
/* eslint-disable no-prototype-builtins */

import Vue from 'vue';

export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    field: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      fieldBooleans: [
        'featured', //
        'required',
        'readonly',
        'disabled',
      ],
      fieldOptionsBooleans: [
        'listBox', // checklist
        'browse', // image
        'hideInput', // image
        'grid', // range-slider
        'force_edges', // range-slider
        'multiple', // vue-multiselect
        'searchable', // vue-multiselect
        'clearOnSelect', // vue-multiselect
        'hideSelected', // vue-multiselect
        'allowEmpty', // vue-multiselect
        'resetAfter', // vue-multiselect
        'closeOnSelect', // vue-multiselect
        'taggable', // vue-multiselect
        'showPointer', // vue-multiselect
      ],
    };
  },

  computed: {
    groups() {
      const groups = [];
      Object.keys(this.form.schema.fields).forEach((k) => {
        if (this.form.schema.fields[k].type === 'group') {
          groups.push({
            groupRootSchemaIndex: k,
            legend: this.form.schema.fields[k].legend,
          });
        }
      });
      return groups;
    },
  },

  watch: {
    'field.label': {
      handler(label) {
        // console.log('label', label);
        if (label) {
          if (this.form.model.hasOwnProperty(this.field.model)) {
            Vue.delete(this.form.model, this.field.model);
          }
          this.field.model = this.modelize(label);
        }
      },
      deep: true,
    },
    'field.model': {
      handler(model) {
        Vue.set(this.form.model, model, null);
      },
      deep: true,
    },
  },

  mounted() {
    // console.log(`Element.mounted, type:${this.field.type}, label:${this.field.label}, model:${this.field.model}`);

    this.initField();

    this.updateFieldConfigurator(this.field);

    Bus.$on('reset_field_configurator', () => {
      this.resetFieldConfigurator();
    });

    Bus.$on('update_field_configurator', (field) => {
      this.updateFieldConfigurator(field);
    });
  },

  beforeDestroy() {
    Bus.$off('reset_field_configurator');
    Bus.$off('update_field_configurator');
  },

  methods: {
    initField() {
      if (this.field.type === 'group' && this.field.legend === '') {
        this.field.legend = `Group ${this.groups.length}`;
      } else if (this.field.label === '') {
        this.field.label = `${this.field.type} label`;
      }
    },

    resetFieldConfigurator() {
      console.log('reset_field_configurator');
      if (this.form.schema.fields.length > 0) {
        Bus.$emit('update_field_configurator', this.form.schema.fields[this.form.schema.fields.length - 1]);
      } else {
        this.form.fieldConfigurator.rootSchemaIndex = -1;
        this.form.fieldConfigurator.groupSchemaIndex = -1;
        this.form.fieldConfigurator.currentGroupRootSchemaIndex = -1;
        this.form.fieldConfigurator.field = {};
      }
    },

    updateFieldConfigurator(field) {
      // console.log('update_field_configurator');

      Object.keys(this.form.schema.fields).forEach((rootKey) => {
        if (this.form.schema.fields[rootKey].type === 'group') {
          if (this.form.schema.fields[rootKey] === field) {
            this.form.fieldConfigurator.rootSchemaIndex = parseInt(rootKey, 10);
            this.form.fieldConfigurator.groupSchemaIndex = -1;
            this.form.fieldConfigurator.currentGroupRootSchemaIndex = -1;
          } else {
            Object.keys(this.form.schema.fields[rootKey].fields).forEach((groupKey) => {
              if (this.form.schema.fields[rootKey].fields[groupKey] === field) {
                this.form.fieldConfigurator.rootSchemaIndex = parseInt(rootKey, 10);
                this.form.fieldConfigurator.groupSchemaIndex = parseInt(groupKey, 10);
                this.form.fieldConfigurator.currentGroupRootSchemaIndex = parseInt(rootKey, 10);
              }
            });
          }
        } else if (this.form.schema.fields[rootKey] === field) {
          this.form.fieldConfigurator.rootSchemaIndex = parseInt(rootKey, 10);
          this.form.fieldConfigurator.groupSchemaIndex = -1;
          this.form.fieldConfigurator.currentGroupRootSchemaIndex = -1;
        }
      });
    },

    onGroupSelected(event, field) {
      const groupIndex = event.target.value;

      // console.log('group.selected', groupIndex);

      if (groupIndex > -1 && this.form.fieldConfigurator.groupSchemaIndex === -1) {
        // console.log(`moving ${field.type} from root to group ${groupIndex}`);

        // Move field to group
        this.form.schema.fields[groupIndex].fields.push(field);

        // remove field from root
        this.form.schema.fields.splice(this.form.fieldConfigurator.rootSchemaIndex, 1);
      } else if (groupIndex > -1 && this.form.fieldConfigurator.groupSchemaIndex > -1) {
        // console.log(`moving ${field.type} from group ${this.form.fieldConfigurator.currentGroupRootSchemaIndex} to group ${groupIndex}`);

        // Move field to group
        this.form.schema.fields[groupIndex].fields.push(field);

        // remove field from previous group
        this.form.schema.fields[this.form.fieldConfigurator.rootSchemaIndex].fields.splice(this.form.fieldConfigurator.groupSchemaIndex, 1);
      } else {
        // console.log(`moving ${field.type} from group ${this.form.fieldConfigurator.groupSchemaIndex} to root`);

        // Move field back to root
        this.form.schema.fields.push(field);

        // remove field from previous group
        this.form.schema.fields[this.form.fieldConfigurator.rootSchemaIndex].fields.splice(this.form.fieldConfigurator.groupSchemaIndex, 1);
      }

      Bus.$emit('update_field_configurator', field);
    },

    modelize(str) {
      let model = str
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '_') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text

      model += `_${new Date().getTime()}`;

      return model;
    },

    addValue() {
      this.field.values.push({
        id: '',
        name: '',
      });

      this.field.values[this.field.values.length - 1] = {
        id: `id-${this.field.values.length}`,
        name: `Name ${this.field.values.length}`,
      };
    },

    removeValue(index) {
      this.field.values.splice(index, 1);
    },

    updateValue(event, fieldValueIndex) {
      this.field.values[fieldValueIndex].value = this.modelize(event.target.value);
      this.resetModel();
    },

    resetModel() {
      if (this.form.model.hasOwnProperty(this.field.model)) {
        Vue.delete(this.form.model, this.field.model);
      }
      this.field.model = this.modelize(this.field.label);
      Vue.set(this.form.model, this.field.model, null);
    },
  },
};
</script>
