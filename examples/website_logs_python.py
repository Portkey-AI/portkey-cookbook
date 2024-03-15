from openai import OpenAI

client = OpenAI(
    api_key="OPENAI_API_KEY",
    base_url="https://api.portkey.ai/v1", ## Point to Portkey's gateway URL
    default_headers= {
        "x-portkey-api-key": "PORTKEY_API_KEY",
        "x-portkey-provider": "openai",
        "Content-Type": "application/json"
    }
)

chat_complete = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's a Fractal?"}],
)

print(chat_complete.choices[0].message.content)
