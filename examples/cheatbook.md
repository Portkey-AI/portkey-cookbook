# Table of Contents

- [Chat Completions Call using Portkey SDK](#chat-completions-call-using-portkey-sdk)
- Chat Completions Call using OpenAI SDK
- Chat Completions Call using OpenAI SDK without Virtual Keys
- Chat Completions Call using 3rd party NPM Library - Axios
- Chat Completions Call using 3rd party NPM Library - `got`
- Chat Completions Call using Curl
- Chat Completions with Gateway Configs
  - Fallbacks
  - Loadbalancing
  - Tracing
  - Retries
  - Examples
- Chat Completions using Portkey SDK with Gateway Configs
  - Examples
- Chat Completions using OpenAI SDK with Gateway Configs
  - Examples
- Gateway Configs at Instantiation
- Gateway Configs at each Request
- Prompt Completions using Portkey SDK
- Postman Collection
  - Chat Completions
  - Embeddings
  - Prompt Completions
  - Rendering Prompts
- Retrieve Prompt Templates and call with OpenAI SDK
- Embeddings Call using Portkey SDK
- ( researching more common requirements )

Find code snippets of different combinations.

### Chat Completions Call using Portkey SDK

```js
import { Portkey } from 'portkey-ai';

const portkey = new Portkey({
  apiKey: process.env.PORTKEY_API_KEY,
  virtualKey: process.env.LLM_VIRTUAL_KEY
});

const response = await portkey.chat.completions.create({
  messages: [
    {
      role: 'user',
      content: 'What is LLMOps?'
    }
  ],
  model: 'gpt-3.5-turbo'
});

console.log(response.choices[0].message.content);
```

### Chat Completions Call using OpenAI SDK
