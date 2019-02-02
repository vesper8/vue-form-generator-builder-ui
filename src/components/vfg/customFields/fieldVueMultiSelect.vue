<template>
  <Multiselect
    :id="fieldOptions.id"
    :options="options"
    :value="value"
    :multiple="fieldOptions.multiple"
    :track-by="fieldOptions.trackBy || null"
    :label="fieldOptions.label || null"
    :searchable="fieldOptions.searchable"
    :clear-on-select="fieldOptions.clearOnSelect"
    :hide-selected="fieldOptions.hideSelected"
    :placeholder="placeholder"
    :allow-empty="fieldOptions.allowEmpty"
    :reset-after="fieldOptions.resetAfter"
    :close-on-select="fieldOptions.closeOnSelect"
    :custom-label="customLabel"
    :taggable="fieldOptions.taggable"
    :tag-placeholder="fieldOptions.tagPlaceholder"
    :max="fieldOptions.max || null"
    :options-limit="fieldOptions.optionsLimit"
    :group-values="fieldOptions.groupValues"
    :group-label="fieldOptions.groupLabel"
    :block-keys="fieldOptions.blockKeys"
    :internal-search="fieldOptions.internalSearch"
    :select-label="fieldOptions.selectLabel"
    :selected-label="fieldOptions.selectedLabel"
    :deselect-label="fieldOptions.deselectLabel"
    :show-labels="fieldOptions.showLabels"
    :limit="fieldOptions.limit"
    :limit-text="fieldOptions.limitText"
    :loading="fieldOptions.loading"
    :disabled="disabled"
    :max-height="fieldOptions.maxHeight"
    :show-pointer="fieldOptions.showPointer"
    :option-height="fieldOptions.optionHeight"
    @input="updateSelected"
    @select="onSelect"
    @remove="onRemove"
    @search-change="onSearchChange"
    @tag="addTag"
    @open="onOpen"
    @close="onClose"
  >
    <span slot="noResult">
      {{ fieldOptions.noResult }}
    </span>
  </Multiselect>
</template>

<script>
let VueFormGenerator = require('vue-form-generator');

// Fix between local and exported projectfa
if (VueFormGenerator.default) {
  VueFormGenerator = VueFormGenerator.default;
}

export default {
  name: 'FieldVueMultiSelect',
  mixins: [VueFormGenerator.abstractField],
  computed: {
    options() {
      const values = this.schema.values;
      if (typeof values === 'function') {
        return values.apply(this, [this.model, this.schema]);
      }
      return values;
    },
    customLabel() {
      if (
        typeof this.fieldOptions.customLabel !== 'undefined'
        && typeof this.fieldOptions.customLabel === 'function'
      ) {
        return this.fieldOptions.customLabel;
      }
      // this will let the multiselect library use the default behavior if customLabel is not specified
      return undefined;
    },
  },
  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      console.error(
        "'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!",
      );
    }
  },
  methods: {
    updateSelected(value /* , id */) {
      this.value = value;
    },
    addTag(newTag, id) {
      const onNewTag = this.fieldOptions.onNewTag;
      if (typeof onNewTag === 'function') {
        onNewTag(newTag, id, this.options, this.value);
      }
    },
    onSearchChange(searchQuery, id) {
      const onSearch = this.fieldOptions.onSearch;
      if (typeof onSearch === 'function') {
        onSearch(searchQuery, id, this.options);
      }
    },
    onSelect(/* selectedOption, id */) {
      // console.log("onSelect", selectedOption, id);
    },
    onRemove(/* removedOption, id */) {
      // console.log("onRemove", removedOption, id);
    },
    onOpen(/* id */) {
      // console.log("onOpen", id);
    },
    onClose(/* value, id */) {
      // console.log("onClose", value, id);
    },
  },
};
</script>
