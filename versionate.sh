#!/bin/bash

# 0. Comprobar que estamos en la rama "main"
current_branch=$(git symbolic-ref --short HEAD)
if [[ "$current_branch" != "main" ]]; then
  echo "¡Estás en la rama $current_branch! Este script solo puede ejecutarse en la rama 'main'."
  exit 1
fi

# 1. Hacer git add, git commit, git push en la rama actual
echo "Añadiendo cambios..."
git add .
read -p "Escribe tu mensaje de commit: " commit_message
if [[ -z "$commit_message" ]]; then
  echo "El mensaje de commit no puede estar vacío."
  exit 1
fi
git commit -m "$commit_message"
git push origin "$current_branch"

# 2. Obtener la versión desde package.json
version=$(jq -r '.version' package.json)
if [[ -z "$version" ]]; then
  echo "No se encontró la versión en package.json."
  exit 1
fi

# 3. Crear la rama de versión v${version} (sobrescribir si ya existe)
branch_name="v$version"

# Verificar si la rama ya existe y eliminarla si es necesario
git branch -D "$branch_name" 2>/dev/null # Eliminar rama local si existe
git push origin --delete "$branch_name" 2>/dev/null # Eliminar rama remota si existe

# Crear la nueva rama a partir de la rama actual
git checkout -b "$branch_name"
git push origin "$branch_name"

# 4. Subir la nueva rama al remoto
echo "Rama '$branch_name' creada y subida al remoto."

# 5. Volver a la rama "main"
git checkout main

echo "Vuelto a la rama 'main'."
