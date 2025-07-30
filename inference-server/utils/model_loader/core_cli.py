import asyncio
from export_to_onnx import export_to_onnx
from transformers import AutoTokenizer, AutoModelForCausalLM
from dotenv import load_dotenv
from pathlib import Path
import subprocess
import os

async def load_model(model_name: str, cache_dir: str, device: str = None):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)
    if device:
        model.to(device)
    return model, tokenizer

async def main():
    load_dotenv(Path(__file__).resolve().parents[2] / ".env")  # Load PROJECT_PATH/.env

    model_name = os.getenv("MODEL_NAME")
    export_path = Path(os.getenv("EXPORT_PATH")).resolve()
    model_path = Path(os.getenv("MODEL_PATH").replace("$MODEL_NAME", model_name)).resolve()
    device = os.getenv("DEVICE")

    print(f"Using model: {model_name}")
    print(f"Export path: {export_path}")
    print(f"Model path: {model_path}")
    print(f"Device: {device}")

    # Load model
    model, tokenizer = await load_model(model_name, str(model_path), device)
    print("Model and tokenizer loaded successfully.")

    # Export ONNX
    # export_to_onnx(model , export_path)

    # Find Bash
    bash_path = "bash"
    if os.name == "nt":  # Windows
        bash_path = "C:/Program Files/Git/bin/bash.exe"

    # Call Bash script
    subprocess.run(
        [bash_path, str(Path(__file__).resolve().parent / "export_to_mar.sh")],
        env=os.environ.copy()
    )

if __name__ == "__main__":
    asyncio.run(main())
