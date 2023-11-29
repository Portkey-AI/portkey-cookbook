import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "OPENAI_API_KEY",
  baseURL: "https://api.portkey.ai/v1/proxy", // Point to Portkey's gateway URL
  defaultHeaders:{
    "x-portkey-api-key": "PORTKEY_API_KEY",
    "x-portkey-mode": "proxy openai",
    "Content-Type": "application/json"
  }
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "What's the significance of 1729?"}],
    model: 'gpt-4',
  });

  console.log(chatCompletion.choices);
}

main();
