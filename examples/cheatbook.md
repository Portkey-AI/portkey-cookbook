# Table of Contents

- [Chat Completions Call using Portkey SDK](#chat-completions-call-using-portkey-sdk)
- [Chat Completions Call using OpenAI SDK](#chat-completions-call-using-openai-sdk-with-virtual-key)
- [Chat Completions Call using OpenAI SDK without Virtual Keys]()
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

<hr>

Find code snippets of different combinations.

Few concepts:

- **Portkey API Key** : API Key of your Portkey account
- **Virtual key** : An identifier to LLM API Keys. [Learn more](https://portkey.ai/docs/product/ai-gateway-streamline-llm-integrations/virtual-keys).

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

### Chat Completions Call using OpenAI SDK (with Virtual Key)

```js
import OpenAI from 'openai';
import { PORTKEY_GATEWAY_URL, createHeaders } from 'portkey-ai';

const openai = new OpenAI({
  apiKey: '<IGNORED>',
  baseURL: PORTKEY_GATEWAY_URL,
  defaultHeaders: createHeaders({
    provider: 'openai',
    apiKey: process.env.PORTKEY_API_KEY,
    virtualKey: process.env.LLM_VIRTUAL_KEY
  })
});

const response = await openai.chat.completions.create({
  messages: [
    {
      role: 'user',
      content: `What is LLMOps`
    }
  ],
  model: 'gpt-4'
});

console.log(response.choices[0].message.content);
```

- The `provider` must support `model`. For example, if `provider` is _Anthropic_ the `model` identifier must be _claude_ set of models.

### Chat Completions Call using OpenAI SDK (without Virtual Key)

The provider is `OpenAI`

```js
import OpenAI from 'openai';
import { PORTKEY_GATEWAY_URL, createHeaders } from 'portkey-ai';

const client = new OpenAI({
  apiKey: 'sk-********',
  baseURL: PORTKEY_GATEWAY_URL,
  defaultHeaders: createHeaders({
    provider: 'openai',
    apiKey: process.env.PORTKEY_API_KEY
  })
});

const response = await client.chat.completions.create({
  messages: [
    {
      role: 'user',
      content: `What is LLMOps?`
    }
  ],
  model: 'gpt-4'
});

console.log(response.choices[0].message.content);
```

The value of `apiKey` must be API key to use the LLM provider. For example, if the LLM provider is Perplexity AI:

```js
import OpenAI from 'openai';
import { PORTKEY_GATEWAY_URL, createHeaders } from 'portkey-ai';

const client = new OpenAI({
  apiKey: 'pplx-xxxxxxxxxxxxxx', // PERPLEXITY API KEY
  baseURL: PORTKEY_GATEWAY_URL,
  defaultHeaders: createHeaders({
    provider: 'perplexity-ai',
    apiKey: process.env.PORTKEY_API_KEY
  })
});

const response = await client.chat.completions.create({
  messages: [
    {
      role: 'user',
      content: `What is LLMOps?`
    }
  ],
  model: 'pplx-70b-chat'
});

console.log(response.choices[0].message.content);
```
