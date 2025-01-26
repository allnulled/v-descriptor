Vue.directive("descriptor", {
  bind(el, binding) {
      const resolveClasses = key => {
          const resolved = window.stylingDescriptor[key];
          if (!resolved) return key; // Si no existe, devolvemos la clave original.
          return resolved
              .map(subKey => resolveClasses(subKey)) // Resolvemos recursivamente.
              .flat(); // Aplanamos para evitar arreglos anidados.
      };

      const descriptorKeys = (binding.value || el.getAttribute("descriptor"))
          .split(" "); // Dividimos las claves.

      const descriptorClasses = descriptorKeys
          .map(key => resolveClasses(key)) // Resolvemos cada clave.
          .flat(); // Aplanamos el resultado.

      descriptorClasses.forEach(cls => el.classList.add(cls)); // Añadimos las clases.
  }
});