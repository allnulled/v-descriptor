Vue.directive("descriptor", {
  bind(el, binding) {
      const resolveClasses = key => {
          const resolved = window.stylingDescriptor[key];
          if (!resolved) return key;
          return resolved.map(subKey => resolveClasses(subKey)).flat();
      };
      const descriptorKeys = (binding.value || el.getAttribute("descriptor")).split(" ");
      const descriptorClasses = descriptorKeys.map(key => resolveClasses(key)).flat();
      descriptorClasses.forEach(cls => el.classList.add(cls));
  }
});