#!/bin/bash

# Pregunta por el mensaje de commit
read -p "Enter your commit message: " commit_message

# Verifica si se proporcionó un mensaje
if [ -z "$commit_message" ]; then
  echo "Commit message cannot be empty. Aborting."
  exit 1
fi

# Añade los cambios al índice
echo "Adding changes..."
git add .

# Realiza el commit
echo "Committing changes..."
git commit -m "$commit_message"

# Realiza el push a la rama actual
echo "Pushing to remote repository..."
git push

echo "Done!"