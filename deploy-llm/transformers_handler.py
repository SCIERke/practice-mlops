from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from ts.torch_handler.base_handler import BaseHandler

class TransformersHandler(BaseHandler):
    def __init__(self):
        super().__init__()
        self.initialized = False

    def initialize(self, ctx):
        model_dir = ctx.system_properties.get("model_dir")
        self.model = AutoModelForCausalLM.from_pretrained(model_dir)
        self.tokenizer = AutoTokenizer.from_pretrained(model_dir)
        self.model.eval()
        self.initialized = True

    def preprocess(self, data):
        text = data[0].get("data") or data[0].get("body")
        inputs = self.tokenizer(text, return_tensors="pt")
        return inputs

    def inference(self, inputs):
        outputs = self.model.generate(**inputs, max_new_tokens=20)
        return self.tokenizer.batch_decode(outputs, skip_special_tokens=True)

    def postprocess(self, inference_output):
        return inference_output