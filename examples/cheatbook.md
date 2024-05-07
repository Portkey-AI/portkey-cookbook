# Table of Contents

**Chat Completions**

[Chat Completions Call using Portkey SDK](#chat-completions-call-using-portkey-sdk)
[Chat Completions Call using OpenAI SDK](#chat-completions-call-using-openai-sdk)
[Chat Completions Call with NPM Library: Axios](#chat-completions-call-with-npm-package-axios)
[Chat Completions Call using NPM Library: `got`](#chat-completions-call-with-npm-package-got)
[Chat Completions Call using `Curl`](#chat-completions-call-using-curl)
[Chat Completions Call with AI Gateway Configs](#chat-completions-call-with-ai-gateway-configs)
Chat Completions Call per request (not during instantiation)

**Embeddings**

**Prompt Completions**

<hr>

Find code snippets of different combinations.

Few concepts:

- **Portkey API Key** : API Key of your Portkey account
- **Virtual key** : An identifier to LLM API Keys. [Learn more](https://portkey.ai/docs/product/ai-gateway-streamline-llm-integrations/virtual-keys).

## Chat Completions

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

**Chat Completions Call using OpenAI SDK without Virtual Key**

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

### Chat Completions Call with NPM Package: Axios

**Chat Completions Call with Axios Library: Using Virtual Keys**

```js
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'x-portkey-api-key': '<PORTKEY_API_KEY>',
  'x-portkey-virtual-key': '<LLM_VIRTUAL_KEY>'
};

const data = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is LLMOps' }]
};

try {
  const { data: response } = await axios.post('https://api.portkey.ai/v1/chat/completions', data, { headers: headers });
  console.log(response.choices[0].message.content);
} catch (error) {
  console.error(error);
}
```

**Chat Completions Call with Axios Library: Without using Virtual Keys**

Use Basic Authentication instead of Virtual keys.

```js
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'x-portkey-api-key': 'PORTKEY_API_KEY',
  'x-portkey-provider': 'openai', // Provider name
  Authorization: 'Bearer sk-******' // Provider API Key
};

const data = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is LLMOps' }]
};

try {
  const { data: response } = await axios.post('https://api.portkey.ai/v1/chat/completions', data, { headers: headers });
  console.log(response.choices[0].message.content);
} catch (error) {
  console.error(error);
}
```

### Chat Completions Call with NPM Package: `got`

**Chat Completions Call using Virtual Keys**

```js
import got from 'got';

const url = 'https://api.portkey.ai/v1/chat/completions';

const options = {
  headers: {
    'x-portkey-api-key': 'PORTKEY_API_KEY',
    'x-portkey-virtual-key': 'LLM_VIRTUAL_KEY'
  },
  json: {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'What is LLMOps?' }]
  }
};

let { body: response } = await got.post(url, options);
response = JSON.parse(response);
console.log(response.choices[0].message.content);
```

**Chat Completions Call with `got` Library using Basic Authentication**

```js
import got from 'got';

const url = 'https://api.portkey.ai/v1/chat/completions';

const options = {
  headers: {
    'x-portkey-api-key': 'PORTKEY_API_KEY',
    'x-portkey-provider': 'openai', // Provider name
    Authorization: 'Bearer sk-************' // Provider API Key
  },
  json: {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'What is LLMOps?' }]
  }
};

let { body: response } = await got.post(url, options);
response = JSON.parse(response);
console.log(response.choices[0].message.content);
```

### Chat Completions Call using `Curl`

Virtual Keys

```sh
curl -X POST "https://api.portkey.ai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "x-portkey-api-key: <PORTKEY_API_KEY>" \
  -H "x-portkey-virtual-key: <LLM_VIRTUAL_KEY>" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "What is LLMOps"}]
  }'
```

Basic authentication

```sh
curl -X POST "https://api.portkey.ai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "x-portkey-api-key: PORTKEY_API_KEY" \
  -H "x-portkey-provider: openai" \
  -H "Authorization: Bearer sk-******" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "What is LLMOps?"}]
  }'
```

### Chat Completions Call with AI Gateway Configs

For **example** if the requests to LLMs should:

- be retried upto 3 times on response status codes `408`, `429`, `401`
- should fallback from openai to anyscale + anthropic models
- fallen back requests: split 30% to anyscale models and 70% to anthorpic models
- not wait for response longer than 10s

**Gateway Config**

```json
// EXAMPLE_GATEWAY_CONFIGS
{
  "retry": {
    "attempts": 3,
    "on_status_codes": [408, 539, 401]
  },
  "request_timeout": 20000,
  "strategy": {
    "mode": "fallback"
  },
  "targets": [
    {
      "virtual_key": "open-ai-key-66a67d",
      "override_params": {
        "model": "gpt-3.5-turbo"
      }
    },
    {
      "strategy": {
        "mode": "loadbalance"
      },
      "targets": [
        {
          "virtual_key": "anyscale-3d8c65",
          "override_params": {
            "model": "meta-llama/Llama-2-70b-chat-hf"
          },
          "weight": 0.3
        },
        {
          "virtual_key": "anthropic-7b4632",
          "override_params": {
            "max_tokens": 2000,
            "model": "claude-3-opus-20240229"
          },
          "weight": 0.7
        }
      ]
    }
  ]
}
```

<details>

<summary> <b>Portkey SDK</b>: Pass Gateway Configs as Arguments </summary>

```js
import { Portkey } from 'portkey-ai';

const portkey = new Portkey({
  apiKey: process.env.PORTKEY_API_KEY,
  virtualKey: process.env.LLM_VIRTUAL_KEY,

  // Option: Pass the Configs Argument directly
  config: JSON.stringify({<EXAMPLE_GATEWAY_CONFIGS>})
});

const response = await portkey.chat.completions.create({
  messages: [{ role: 'user', content: 'What is LLMOps?'}],
  model: 'gpt-3.5-turbo'
});

console.log(response.choices[0].message.content);
```

</details>

<details>

<summary> <b>Portkey SDK</b>: Reference Gateway Configs ID </summary>

Instead get a Config ID from [Portkey](www.portkey.ai/signup) App > Configs > Create Configs.

```js
import { Portkey } from 'portkey-ai';

const portkey = new Portkey({
  apiKey: process.env.PORTKEY_API_KEY,
  virtualKey: process.env.LLM_VIRTUAL_KEY,
  // Option: Reference to Configs in the Portkey App
  config: 'pc-xxxxxxx-d0'
});

const response = await portkey.chat.completions.create({
  messages: [{ role: 'user', content: 'What is LLMOps?' }],
  model: 'gpt-3.5-turbo'
});

console.log(response.choices[0].message.content);
```

</details>

<details>
<summary> <b>OpenAI SDK</b>: Pass Gateway Configs as Arguments </summary>

```js
import OpenAI from 'openai';
import { PORTKEY_GATEWAY_URL, createHeaders } from 'portkey-ai';

const openai = new OpenAI({
  apiKey: '<IGNORED>',
  baseURL: PORTKEY_GATEWAY_URL,
  defaultHeaders: createHeaders({
    provider: 'openai',
    apiKey: process.env.PORTKEY_API_KEY,
    virtualKey: process.env.LLM_API_KEY,
    // Option: Pass the Configs Argument directly
    config: JSON.stringify({<EXAMPLE_GATEWAY_CONFIGS>})
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

</details>

<details>

<summary> <b>OpenAI SDK</b>: Reference Gateway Configs ID </summary>

Instead get a Config ID from [Portkey](www.portkey.ai/signup) App > Configs > Create Configs.

```js
import OpenAI from 'openai';
import { PORTKEY_GATEWAY_URL, createHeaders } from 'portkey-ai';

const openai = new OpenAI({
  apiKey: '<IGNORED>',
  baseURL: PORTKEY_GATEWAY_URL,
  defaultHeaders: createHeaders({
    provider: 'openai',
    apiKey: process.env.PORTKEY_API_KEY,
    // Option: Reference to Configs in the Portkey App
    config: 'pc-xxxxxxx-d0'
  })
});

const response = await openai.chat.completions.create({
  messages: [{ role: 'user', content: `What is LLMOps` }],
  model: 'gpt-4'
});

console.log(response.choices[0].message.content);
```

</details>

<details>

<summary> <b>Axios</b>: Pass Gateway Configs as Arguments </summary>

```js
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'x-portkey-api-key': '<PORTKEY_API_KEY>',
  'x-portkey-virtual-key': '<LLM_VIRTUAL_KEY>'
  'x-portkey-config': '{<EXAMPLE_GATEWAY_CONFIG>}'
};

const data = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is LLMOps' }]
};

try {
  const { data: response } = await axios.post('https://api.portkey.ai/v1/chat/completions', data, { headers: headers });
  console.log(response.choices[0].message.content);
} catch (error) {
  console.error(error);
}
```

</details>

<details>

<summary> <b>Axios</b>: Reference Gateway Configs ID </summary>

```js
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'x-portkey-api-key': '<PORTKEY_API_KEY>',
  'x-portkey-virtual-key': '<LLM_VIRTUAL_KEY>'
  'x-portkey-config': 'pc-xxxxxxx-d0'
};

const data = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'What is LLMOps?' }]
};

try {
  const { data: response } = await axios.post('https://api.portkey.ai/v1/chat/completions', data, { headers: headers });
  console.log(response.choices[0].message.content);
} catch (error) {
  console.error(error);
}
```

</details>

<details>

<summary> <b>Curl</b>: Pass Gateway Configs as Arguments </summary>

```sh
curl -X POST "https://api.portkey.ai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "x-portkey-api-key: <PORTKEY_API_KEY>" \
  -H "x-portkey-virtual-key: <LLM_VIRTUAL_KEY>" \
  -H "x-portkey-config: '{<EXAMPLE_GATEWAY_CONFIG>}'" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "What is LLMOps"}]
  }'
```

</details>

<details>

<summary> <b>Curl</b>: Reference Gateway Configs ID</summary>

```sh
curl -X POST "https://api.portkey.ai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "x-portkey-api-key: <PORTKEY_API_KEY>" \
  -H "x-portkey-virtual-key: <LLM_VIRTUAL_KEY>" \
  -H "x-portkey-config: 'pc-xxxxxxx-d0'" \
  -d '{
    "model": "gpt-4",
    "messages": [{"role": "user", "content": "What is LLMOps"}]
  }'
```

</details>
