import Vue from 'vue';

import { ToggleButton } from 'vue-js-toggle-button';
import BootstrapVue from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
import App from './App.vue';
import router from './router';

// VFG custom fields
import fieldVueCalendar from '@/components/vfg/customFields/fieldVueCalendar.vue';
import fieldVueToggleButton from '@/components/vfg/customFields/fieldVueToggleButton.vue';
import fieldVueSliderComponent from '@/components/vfg/customFields/fieldVueSliderComponent.vue';

Vue.use(BootstrapVue);

// VUE-FORM-GENERATOR
let VueFormGenerator = require('vue-form-generator');
// Fix between local and exported project
if (VueFormGenerator.default) {
  VueFormGenerator = VueFormGenerator.default;
}

const {
  fieldCheckbox,
  fieldChecklist,
  fieldInput,
  fieldLabel,
  fieldRadios,
  fieldSelect,
  fieldSubmit,
  fieldTextArea,
  fieldUpload,
  fieldCleave,
  fieldDateTimePicker,
  fieldGoogleAddress,
  fieldImage,
  fieldMasked,
  fieldNoUiSlider,
  fieldPikaday,
  fieldRangeSlider,
  fieldSelectEx,
  fieldSpectrum,
  fieldStaticMap,
  fieldSwitch,
  fieldVueMultiSelect,
} = VueFormGenerator.fieldsLoader;

// Test custom field
// import fieldAwesome from "./fieldAwesome.vue";

Vue.use(VueFormGenerator, {
  fields: [
    // custom start
    fieldVueCalendar,
    fieldVueToggleButton,
    fieldVueSliderComponent,
    // custom end
    fieldCheckbox,
    fieldChecklist,
    fieldInput,
    fieldLabel,
    fieldRadios,
    fieldSelect,
    fieldSubmit,
    fieldTextArea,
    fieldUpload,
    fieldCleave,
    fieldDateTimePicker,
    fieldGoogleAddress,
    fieldImage,
    fieldMasked,
    fieldNoUiSlider,
    fieldPikaday,
    fieldRangeSlider,
    fieldSelectEx,
    fieldSpectrum,
    fieldStaticMap,
    fieldSwitch,
    fieldVueMultiSelect,
  ],
});
// VUE-FORM-GENERATOR

Vue.component('Debug', () => import('./components/Debug'));
Vue.component('JsonEditor', () => import('./components/JsonEditor'));
Vue.component('multiselect', Multiselect);
Vue.component('ToggleButton', ToggleButton);

Vue.config.productionTip = false;

window.Bus = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
