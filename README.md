# v-descriptor

Inject CSS classes with meaning. For vue.js (v2).

## Installation

```html
<script src="node_modules/@allnulled/v-descriptor/v-descriptor.js"></script>
```

## Usage

The current test goes as follows:

```js
window.stylingDescriptor = {
    titulo: ["fondoNegro", "letraBlanca"],
    principal: ["letraGrande"],
    emergencia: ["fondoRojoImportante"]
};
Vue.component("app", {
    template: `
        <div>
            <div v-descriptor="'titulo principal emergencia'">
                Este mensaje debería verse en rojooo
            </div>
        </div>
    `
});
const app = new Vue({
    render: h => h(Vue.options.components.app),
}).$mount("#app");
```

This will make reflect `fondoNegro letraBlanca letraGrande fondoRojoImportante` as classes.

You can use it recursively, and only the *non-solved keys* will become applied as classes, **(caution:) unless it contains `.` in the key**. This allows you to use `.` as namespacer for document sections, which makes sense, as the names of these sections will be absolutely **virtual** and will have no direct interaction with the DOM in any step.

Only the unsolved keys that do not contain `.` will be applied as class.

With this rule, and aware that you have to `"'whatever w2 w3'"` (so, `"'` to open and `'"` to close), you can go straightforward.
