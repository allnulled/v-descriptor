(() => {

  const getDescriptorKeys = function (el, binding) {
    if (binding.expression.startsWith("'") || binding.expression.startsWith('"')) {
      return (binding.value || el.getAttribute("descriptor")).split(" ");
    }
    return (binding.expression || el.getAttribute("descriptor")).split(" ");
  };

  Vue.directive("descriptor", {
    bind(el, binding) {
      const resolveClasses = key => {
        let resolved = window.stylingDescriptor[key];
        if (!resolved) return key;
        if (typeof resolved === "string") {
          resolved = resolved.split(" ");
        }
        return resolved.map(subKey => resolveClasses(subKey)).flat();
      };
      const descriptorKeys = getDescriptorKeys(el, binding);
      const descriptorClasses = descriptorKeys.map(key => resolveClasses(key)).flat();
      descriptorClasses.forEach(cls => {
        if (cls.indexOf(".") === -1) {
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
    padding-top: 0px;
  }
  .bordered_1 {
    border: 1px solid #999;
    border-radius: 2pt;
  }
  .with_separator_on_bottom_1 {
    border-bottom: 1px solid #999;
  }
  .lateral_button {
    height: 100%;
  }
  .lateral_button_cell {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-right: 4px;
  }
  .padded_1 {
    padding: 4px;
  }
  .vertically_padded_1 {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .horizontally_padded_1 {
    padding-left: 4px;
    padding-right: 4px;
  }
  .left_padded_1 {
    padding-left: 4px;
  }
  .right_padded_1 {
    padding-right: 4px;
  }
  .top_padded_1 {
    padding-top: 4px;
  }
  .bottom_padded_1 {
    padding-bottom: 4px;
  }
  .calendar_main_panel {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .calendar_buttons_panel_1 {
    padding-bottom: 4px;
    padding-top: 4px;
  }
`;
  document.body.appendChild(styleTag);

  window.stylingDescriptor = {
    "agenda.calendar.buttons_panel_1": "calendar_main_panel calendar_buttons_panel_1",
    "agenda.task_form.title": "title_of_form",
    "agenda.task_form.block": "block_of_form",
    "agenda.task_form.block_of_add_button": "block_of_form vertically_padded_1",
    "agenda.task_form.block_of_aggregated_field": "bordered_1",
    "agenda.task_form.section": "with_separator_on_bottom_1",
    "agenda.task_form.aggregations.block": "block_of_form",
    "agenda.task_form.aggregations.lateral_button": "lateral_button",
    "agenda.task_form.aggregations.lateral_button_cell": "lateral_button_cell",
    "lsw_table.no_data_provided_message": "pad_top_2 pad_bottom_2"
  }

})();