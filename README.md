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