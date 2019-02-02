# vue-form-generator-schema-builder

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Demo](http://github.vue.vfg-schema-builder.cbass.ca/).

### About
This repository, which runs on vue-cli 3, provides a simple graphical user interface for creating schemas to be used with [vue-form-generator](https://github.com/vue-generators/vue-form-generator)

It is not meant to be pulled into an existing project, but rather meant as a tool to be used on the side to create forms that are then used in your project(s)

Take note that this repository makes use of the yet-unreleased v3 branch which is still a work in progress. There are no plans to make it backwards compatible with the current stable v2 branch.

I created this because I needed v3's new features such as advanced grouping.

The tests (cypress) are very much incomplete.

The custom field templates are also a work in progress and do not currently work.

Not all field types available with VFG are currently supported by this builder

### Features
Add fields, remove field, customize fields

Add groups

Drag-n-drop (in leftmost column of top left pane) around to move to/from groups

View/Import/export shema (bottom panes)

Visualize rendered form (top right pane)


### Contributing
PRs and collaborators are most welcome.

Apologies if my code is difficult to follow. This is the first time I share a project in Github
