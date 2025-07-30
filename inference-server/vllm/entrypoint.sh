#!/bin/bash
echo "$HUGGINGFACE_HUB_TOKEN" | huggingface-cli login --token $HUGGINGFACE_HUB_TOKEN
python3 -m vllm.entrypoints.openai.api_server \
  --model Locutusque/TinyMistral-248M \
  --dtype float16 \
  --max-model-len 1024 \
  --load-format safetensors \

nvidia-smi