#!/bin/bash
set -e

echo "Exporting model with:"
echo "MODEL_NAME=$MODEL_NAME"
echo "EXPORT_PATH=$EXPORT_PATH"
echo "MODEL_PATH=$MODEL_PATH"

torch-model-archiver \
  --model-name "$MODEL_NAME" \
  --version 1.0 \
  --handler transformers_handler.py \
  --export-path "$EXPORT_PATH" \
  --extra-files "transformers_handler.py" \
  --serialized-file "$MODEL_PATH/pytorch_model.bin"
