<template>
  <ToggleButton
    v-model="value"
    color="#82C7EB"
    :sync="true"
    :labels="{checked: 'Foo', unchecked: 'Bar'}"
    @change="onChangeEventHandler"
    @input="onInputEventHandler"
  />
</template>

<script>
let VueFormGenerator = require('vue-form-generator');

// Fix between local and exported projectfa
if (VueFormGenerator.default) {
  VueFormGenerator = VueFormGenerator.default;
}

export default {
  name: 'FieldToggleButton',
  mixins: [VueFormGenerator.abstractField],

  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      console.error(
        "'vue-js-toggle-button' is missing. Please download from https://github.com/euvl/vue-js-toggle-button and register the component globally!",
      );
    }
  },
  methods: {
    onChangeEventHandler(data) {
      console.log('ToggleButton.value', data);
      this.value = data.value;
    },
    onInputEventHandler(/* event */) {
      // this.value = value;
    },
  },
};
</script>
