<template>
  <div
    id="element-list"
    class="text-left"
  >
    <draggable
      v-model="form.schema.fields"
      class="rootDragArea"
      :options="dragOptions"
      @end="onEnd"
    >
      <template v-for="(field, rootSchemaIndex) in form.schema.fields">
        <template v-if="field.type === 'group'">
          <div :key="`root-${rootSchemaIndex}`">
            <b-button-group size="sm">
              <b-button
                variant="secondary"
                size="sm"
                class="btn-is-group"
                @click="editField(field, rootSchemaIndex, -1)"
              >
                {{ field.legend }}
              </b-button>
              <b-button
                class="remove"
                variant="danger"
                size="sm"
                @click="removeField(field, rootSchemaIndex, -1)"
              >
                <i class="fas fa-trash" />
              </b-button>
            </b-button-group>
            <draggable
              :list="field.fields"
              class="groupDragArea"
              :options="dragOptions"
              @end="onEnd"
            >
              <template v-for="(groupField, groupSchemaIndex) in field.fields">
                <b-button-group
                  :key="`root-${rootSchemaIndex}-group-${groupSchemaIndex}`"
                  size="sm"
                  class="btn-in-group"
                >
                  <b-button
                    variant="secondary"
                    size="sm"
                    @click="editField(groupField, rootSchemaIndex, groupSchemaIndex)"
                  >
                    {{ groupField.type }}
                  </b-button>
                  <b-button
                    class="remove"
                    variant="danger"
                    size="sm"
                    @click="removeField(groupField, rootSchemaIndex, groupSchemaIndex)"
                  >
                    <i class="fas fa-trash" />
                  </b-button>
                </b-button-group>
              </template>
            </draggable>
          </div>
        </template>
        <template v-else>
          <b-button-group
            :key="`root-${rootSchemaIndex}`"
            size="sm"
          >
            <b-button
              variant="secondary"
              size="sm"
              @click="editField(field, rootSchemaIndex, -1)"
            >
              {{ field.type }}
            </b-button>
            <b-button
              class="remove"
              variant="danger"
              size="sm"
              @click="removeField(field, rootSchemaIndex, -1)"
            >
              <i class="fas fa-trash" />
            </b-button>
          </b-button-group>
        </template>
      </template>
    </draggable>
  </div>
</template>

<script>
import Vue from 'vue';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },

  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      dragOptions: {
        animation: 1,
        group: 'description',
        ghostClass: 'ghost',
      },
    };
  },

  methods: {
    onEnd() {
      Bus.$emit('update_field_configurator', this.form.fieldConfigurator.field);
    },

    editField(field) {
      // console.log(`ElementList.editField, index:${index}`, field);
      this.form.fieldConfigurator.mounted = false;
      this.form.fieldConfigurator.field = field;
      this.$nextTick(() => {
        this.form.fieldConfigurator.mounted = true;
      });
    },
    removeField(field, rootSchemaIndex, groupSchemaIndex) {
      // console.log(`ElementList.removeField, index:${index}`, field);
      Vue.delete(this.form.model, field.model);

      if (groupSchemaIndex > -1) {
        // console.log(`removing group field rootIndex: ${rootSchemaIndex}, groupIndex: ${groupSchemaIndex}`);
        this.form.schema.fields[rootSchemaIndex].fields.splice(groupSchemaIndex, 1);
      } else {
        // console.log(`removing root field rootIndex: ${rootSchemaIndex}, groupIndex: ${groupSchemaIndex}`);
        this.form.schema.fields.splice(rootSchemaIndex, 1);
      }

      Bus.$emit('reset_field_configurator');
    },
  },
};
</script>

<style scoped>
#element-list {
  margin-left: -10px;
}

#element-list div.btn-group {
  display: block;
  white-space: nowrap;
}

#element-list button.btn-sm {
  margin-bottom: 3px;
  padding: 0.02rem 0.1rem;
  font-size: 0.775rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

#element-list button.btn-sm.remove {
  margin-left: 1px;
  border-radius: 15px;
  padding: 0.05rem 0.2rem;
  font-size: 0.5rem;
}

#element-list .btn-is-group {
  color: #00268d;
  background-color: goldenrod;
  border-color: goldenrod;
}

#element-list .btn-in-group {
  padding-left: 5px;
}

.groupDragArea {
  min-height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
