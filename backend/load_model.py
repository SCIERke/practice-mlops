from transformers import AutoTokenizer, AutoModelForCausalLM


async def load_model(model_name:str ,cache_dir:str , DEVICE:str):
      tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir=cache_dir)
      model = AutoModelForCausalLM.from_pretrained(model_name, cache_dir=cache_dir)
      model.to(DEVICE)

      return model, tokenizer
