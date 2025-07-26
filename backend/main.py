from fastapi import FastAPI

app = FastAPI()

# @app.get("/")
# def read_root():
#   return n

@app.get("/health-check")
def show_health_statu():
  return {"status": "Yeah Yeah, It's worked!"}