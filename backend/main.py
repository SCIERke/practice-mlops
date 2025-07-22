from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
  return {"status": "Yeah Yeah, It's work!"}