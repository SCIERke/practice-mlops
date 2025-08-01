from transformers import AutoTokenizer, AutoModelForCausalLM


async def load_model(model_name:str ,save_dir:str):
      tokenizer = AutoTokenizer.from_pretrained(model_name)
      model = AutoModelForCausalLM.from_pretrained(model_name)

      tokenizer.save_pretrained(save_dir)
      model.save_pretrained(save_dir)


      return model, tokenizer
