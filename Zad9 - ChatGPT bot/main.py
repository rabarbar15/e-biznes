from flask import Flask, request, jsonify
from llamaapi import LlamaAPI
import json
from pydantic import BaseModel

class Prompt(BaseModel):
    prompt: str


llama = LlamaAPI("ApiKey")

def chat_with_llama(prompt):

    api_request_json = {
        "model": "llama3-70b",
        "messages": [
            {
                "role": "user",
                "content": prompt
            },
        ]
    }

    response = llama.run(api_request_json)

    response_dict = json.loads(json.dumps(response.json())) 
    return response_dict["choices"][0]["message"]["content"]


app = Flask(__name__)

@app.route("/")
def home():
    return "Home"

@app.route("/chat", methods=["POST"])
def chat():

    try:
        data = request.get_json()
        prompt = Prompt(**data) 
    except Exception as e:
        return jsonify({"error": "Invalid data format"}), 400

    response = chat_with_llama(prompt.prompt)
    
    return jsonify(response), 201


if __name__ == "__main__":
    app.run()

