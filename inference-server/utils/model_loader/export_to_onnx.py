import torch
from pathlib import Path

def export_to_onnx(model, onnx_path):
    onnx_path = onnx_path + "model.onnx"
    dummy_input = torch.randint(0, 100, (1, 16))
    torch.onnx.export(
        model,
        (dummy_input,),
        onnx_path,
        input_names=["input_ids"],
        output_names=["output"],
        dynamic_axes={"input_ids": {0: "batch_size", 1: "seq_length"},
                      "output": {0: "batch_size", 1: "seq_length"}},
        opset_version=13
    )
    print(f"Model exported to {onnx_path}")
