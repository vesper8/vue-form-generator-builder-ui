<template>
  <VueSlider
    ref="slider"
    v-model="value"
  />
</template>
<script>
let VueFormGenerator = require('vue-form-generator');

// Fix between local and exported projectfa
if (VueFormGenerator.default) {
  VueFormGenerator = VueFormGenerator.default;
}

export default {
  name: 'FieldVueSliderComponent',
  mixins: [VueFormGenerator.abstractField],
  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.VueSlider) {
      console.error("'vue-slider-component' is missing. Please download from https://github.com/NightCatSama/vue-slider-component and register the component globally!");
    }
  },
  methods: {
    // updateSelected(value /* , id */) {
    //   this.value = value;
    // },
    // addTag(newTag, id) {
    //   const onNewTag = this.fieldOptions.onNewTag;
    //   if (typeof onNewTag === 'function') {
    //     onNewTag(newTag, id, this.options, this.value);
    //   }
    // },
    // onSearchChange(searchQuery, id) {
    //   const onSearch = this.fieldOptions.onSearch;
    //   if (typeof onSearch === 'function') {
    //     onSearch(searchQuery, id, this.options);
    //   }
    // },
    // onSelect(/* selectedOption, id */) {
    //   // console.log("onSelect", selectedOption, id);
    // },
    // onRemove(/* removedOption, id */) {
    //   // console.log("onRemove", removedOption, id);
    // },
    // onOpen(/* id */) {
    //   // console.log("onOpen", id);
    // },
    // onClose(/* value, id */) {
    //   // console.log("onClose", value, id);
    // },
  },
};
</script>
