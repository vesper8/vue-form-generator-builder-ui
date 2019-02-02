<template>
  <VCalendar
    :component-prefix="fieldOptions.componentPrefix"
    :first-day-of-week="fieldOptions.firstDayOfWeek"
    :nav-visibility="fieldOptions.navVisibility"
    :title-position="fieldOptions.titlePosition"
    :title-transition="fieldOptions.titleTransition"
    :weeks-transition="fieldOptions.weeksTransition"
    :pane-width="fieldOptions.paneWidth"
    :show-linked-buttons="fieldOptions.showLinkedButtons"
    :formats="fieldOptions.formats"
    :date-picker-input-props="fieldOptions.datePickerInputProps"
    :date-picker-update-on-input="fieldOptions.datePickerUpdateOnInput"
    :date-picker-tint-color="fieldOptions.datePickerTintColor"
    :date-picker-show-caps="fieldOptions.datePickerShowCaps"
    :date-picker-show-day-popover="fieldOptions.datePickerShowDayPopover"
    :date-picker-disabled-attribute="fieldOptions.datePickerDisabledAttribute"
    :popover-expanded="fieldOptions.popoverExpanded"
    :popover-direction="fieldOptions.popoverDirection"
    :popover-align="fieldOptions.popoverAlign"
    :popover-visibility="fieldOptions.popoverVisibility"
    :popover-content-offset="fieldOptions.popoverContentOffset"
    :popover-keep-visible-on-input="fieldOptions.popoverKeepVisibleOnInput"
    :max-swipe-time="fieldOptions.maxSwipeTime"
    :min-horizontal-swipe-distance="fieldOptions.minHorizontalSwipeDistance"
    :max-vertical-swipe-distance="fieldOptions.maxVerticalSwipeDistance"
    :max-tap-tolerance="fieldOptions.maxTapTolerance"
    :max-tap-duration="fieldOptions.maxTapDuration"
    :highlight="fieldOptions.highlight"
    :highlight-caps="fieldOptions.highlightCaps"
    :dot="fieldOptions.dot"
    :bar="fieldOptions.bar"
    :theme-styles="fieldOptions.themeStyles"
    @update:frompage="updateFromPage"
    @update:topage="updateToPage"
    @dayclick="onDayClick"
    @daymouseenter="onDayMouseEnter"
    @daymouseover="onDayMouseOver"
    @daymouseleave="onDayMouseLeave"
  >
    <!-- <span slot="noResult"> -->
    <!-- {{ fieldOptions.noResult }} -->
    <!-- </span> -->
  </VCalendar>
</template>

<script>
let VueFormGenerator = require('vue-form-generator');

// Fix between local and exported projectfa
if (VueFormGenerator.default) {
  VueFormGenerator = VueFormGenerator.default;
}

export default {
  name: 'FieldVueCalendar',
  mixins: [VueFormGenerator.abstractField],
  // computed: {
  //   options() {
  //     const values = this.schema.values;
  //     if (typeof values === 'function') {
  //       return values.apply(this, [this.model, this.schema]);
  //     }
  //     return values;
  //   },
  //   customLabel() {
  //     if (typeof this.fieldOptions.customLabel !== 'undefined' && typeof this.fieldOptions.customLabel === 'function') {
  //       return this.fieldOptions.customLabel;
  //     }
  //     // this will let the multiselect library use the default behavior if customLabel is not specified
  //     return undefined;
  //   },
  // },
  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.VCalendar) {
      console.error("'v-calendar' is missing. Please download from https://github.com/nathanreyes/v-calendar and register the component globally!");
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
