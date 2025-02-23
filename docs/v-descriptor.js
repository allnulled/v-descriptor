Vue.directive("descriptor", {
  bind(el, binding) {
      const resolveClasses = key => {
          let resolved = window.stylingDescriptor[key];
          if (!resolved) return key;
          if(typeof resolved === "string") {
            resolved = resolved.split(" ");
          }
          return resolved.map(subKey => resolveClasses(subKey)).flat();
      };
      const descriptorKeys = (binding.value || el.getAttribute("descriptor")).split(" ");
      const descriptorClasses = descriptorKeys.map(key => resolveClasses(key)).flat();
      descriptorClasses.forEach(cls => {
        if(cls.indexOf(".") === -1) {
          el.classList.add(cls);
        }
      });
  }
});

const styleTag = document.createElement("style");
styleTag.textContent = `
  .title_of_form {
    border: 1px solid #113;
    box-shadow: 0 0 4px black;
    border-radius: 0pt;
    color: black;
    width: 100%;
    padding: 8px;
    font-size: 12px;
    background-color: #AAF;
  }
  .block_of_form {
    padding: 4px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
  }
  .bordered_1 {
    border: 1px solid #CCC;
  }
  .with_separator_on_bottom_1 {
    border-bottom: 1px solid #CCC;
  }
`;
document.body.appendChild(styleTag);

window.stylingDescriptor = {
  "agenda.task_form.title": "title_of_form",
  "agenda.task_form.block": "block_of_form",
  "agenda.task_form.aggregations.block": "block_of_form with_separator_on_bottom_1"
}