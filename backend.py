# first step
# !pip install fastapi uvicorn pyngrok transformers sentencepiece torch

# second step
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import MarianMTModel, MarianTokenizer
import torch

app = FastAPI()

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supported models
SUPPORTED_MODELS = {
    ("en", "hi"): "Helsinki-NLP/opus-mt-en-hi",
    ("hi", "en"): "Helsinki-NLP/opus-mt-hi-en",

    ("en", "bn"): "Helsinki-NLP/opus-mt-en-bn",
    ("bn", "en"): "Helsinki-NLP/opus-mt-bn-en",

    ("en", "es"): "Helsinki-NLP/opus-mt-en-es",
    ("es", "en"): "Helsinki-NLP/opus-mt-es-en",

    ("en", "fr"): "Helsinki-NLP/opus-mt-en-fr",
    ("fr", "en"): "Helsinki-NLP/opus-mt-fr-en",

    ("en", "de"): "Helsinki-NLP/opus-mt-en-de",
    ("de", "en"): "Helsinki-NLP/opus-mt-de-en",

    ("en", "ar"): "Helsinki-NLP/opus-mt-en-ar",
    ("ar", "en"): "Helsinki-NLP/opus-mt-ar-en",

    ("en", "zh"): "Helsinki-NLP/opus-mt-en-zh",
    ("zh", "en"): "Helsinki-NLP/opus-mt-zh-en",
}

# Request model
class TranslateRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

# Translation function
def translate_text(text, src_lang="en", tgt_lang="hi"):
    pair = (src_lang, tgt_lang)

    if pair not in SUPPORTED_MODELS:
        return f"Sorry! Translation {src_lang} → {tgt_lang} not supported yet."

    model_name = SUPPORTED_MODELS[pair]

    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)

    input_tokens = tokenizer(text, return_tensors="pt", padding=True)

    with torch.no_grad():
        output_tokens = model.generate(**input_tokens)

    result = tokenizer.decode(output_tokens[0], skip_special_tokens=True)
    return result

# Route
@app.post("/translate")
def translate_route(req: TranslateRequest):
    translated_output = translate_text(
        req.text, req.source_lang, req.target_lang
    )
    return {"translated_text": translated_output}


# third step
# !pip install fastapi uvicorn pyngrok transformers sentencepiece torch

# fourth step 
# !nohup uvicorn main:app --host 0.0.0.0 --port 8000 --reload &

# fifth step
from pyngrok import ngrok

ngrok.set_auth_token("Your ngrok API")

public_url = ngrok.connect(8000)
public_url

