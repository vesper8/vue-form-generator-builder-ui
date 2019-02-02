<template>
  <div
    v-if="show"
    class="debug"
  >
    <button
      data-toggle="collapse"
      data-text="Collapse"
      @click="collapsed = !collapsed"
    >
      {{ buttonText }}
    </button>

    <div :class="collapseStateClass">
      <div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre v-html="prettyJSON(data)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    forceShow: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Debug',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      collapsed: true,
      // show: process.env.NODE_ENV === 'development' && !process.env.CORDOVA_PLATFORM && this.$route.query.debug,
      show: (process.env.NODE_ENV === 'development' && !process.env.CORDOVA_PLATFORM) || this.forceShow,
      // show: true,
    };
  },

  computed: {
    collapseStateClass() {
      if (this.collapsed) {
        return 'collapse';
      }
      return 'collapse show';
    },

    buttonText() {
      return `${this.collapsed ? 'Show' : 'Hide'} ${this.label}`;
    },
  },

  mounted() {
    this.collapsed = !this.expanded;
  },

  methods: {
    prettyJSON(str) {
      let json = JSON.stringify(str, undefined, 4);
      json = json
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'number';

        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }

        return `<span class="${cls}">${match}</span>`;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
*,
::after,
::before {
  box-sizing: border-box;
}

button {
  text-transform: capitalize;
}

.collapse {
  display: block;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

  &.show {
    max-height: 99em;
    transition: max-height 0.5s ease-in-out;
  }
}
</style>

<style>
.debug {
  padding-top: 10px;
}

.debug pre {
  max-width: 45vw;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

.debug pre .string {
  color: #885800;
}

.debug pre .number {
  color: blue;
}

.debug pre .boolean {
  color: magenta;
}

.debug pre .null {
  color: red;
}

.debug pre .key {
  color: green;
}
</style>
