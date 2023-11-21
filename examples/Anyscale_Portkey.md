# Portkey Integration
Portkey streamlines the production of Anyscale APIs with neat abstractions for observability, fallbacks, caching, and more.

### 1. Setup & Logging
1. Obtain your [Portkey API Key](https://app.portkey.ai/).
2. Switch to Portkey proxy.

See full logs of requests (latency, cost, tokens)—and dig deeper into the data with their analytics suite.
```py
import requests

url = 'https://api.portkey.ai/v1/chat/completions' # Portkey gateway URL

headers = {
    'Authorization': Bearer ANYSCALE_KEY',
    'x-portkey-api-key': 'PORTKEY_API_KEY', # Get from https://app.portkey.ai/,
    'x-portkey-mode': 'proxy anyscale', # Tell Portkey that the request is for Anyscale
    'Content-Type': 'application/json'
}

data = {
    "messages": [{"role": "user", "content": "What happens when you mix red & yellow?"}],
    "model": "mistralai/Mistral-7B-Instruct-v0.1"
}

response = requests.post(url, headers=headers, json=data)

print(response.text)
```
### 2. Enhanced Observability
* Trace requests with single id
* Append custom tags for in-depth analysis

Just add their relevant headers to your reuqest:

```py
import json

TRACE_ID = 'anyscale_portkey_test'

METADATA = {
    "_environment": "production",
    "_user": "userid123",
    "_organisation": "orgid123",
    "_prompt": "summarisationPrompt"
}

headers = {
    'Authorization': Bearer ANYSCALE_KEY',
    'x-portkey-api-key': 'PORTKEY_API_KEY',
    'x-portkey-mode': 'proxy anyscale',
    'Content-Type': 'application/json',
    'x-portkey-trace-id': TRACE_ID, # Send the trace id
    'x-portkey-metadata': json.dumps(METADATA) # Send the metadata
}

response = requests.post(url, headers=headers, json=data)

print(response.text)
```

### 3. Caching, Fallbacks, Load Balancing
* **Fallbacks**: Ensure your application remains functional even if a primary service fails.
* **Load Balancing**: Efficiently distribute incoming requests among multiple models.
* **Semantic Caching**: Reduce costs and latency by intelligently caching results.

Toggle these features through Portkey's Config builder. Head to the **[Configs tab](https://app.portkey.ai)**—if we want to enable semantic caching + fallback from Llama2 to Mistral, your Portkey config would look like this:

```json
{
  "cache": "semantic",
  "mode": "fallback",
  	"options": [
		{
			"provider": "anyscale", "api_key": "...",
			"override_params": {"model": "meta-llama/Llama-2-7b-chat-hf"}
		},
		{
			"provider": "anyscale", "api_key": "...",
			"override_params": {"model": "mistralai/Mistral-7B-Instruct-v0.1"}
		}
	]
}
```

Now, just send the Config key with `x-portkey-config` header:

```py
url = 'https://api.portkey.ai/v1/chat/completions'

headers = {
    'x-portkey-api-key': 'PORTKEY_API_KEY',
    'x-portkey-config': 'CONFIG_KEY',
    'Content-Type': 'application/json'
}

data = {"messages": [{"role": "user", "content": "What happens when you mix red & yellow?"}]}

response = requests.post(url, headers=headers, json=data)

print(response.text)
```

For more on Configs and other gateway feature like Load Balancing, [check out the docs.](https://docs.portkey.ai/portkey-docs/portkey-features/ai-gateway)

### 4. Collect Feedback

Gather weighted feedback from users and improve your app:

```py
import requests
import json

url = "https://api.portkey.ai/v1/feedback" # Portkey Feedback Endpoint

headers = {
	"x-portkey-api-key": os.environ.get("PORTKEY_API_KEY"),
	"Content-Type": "application/json",
}

data = {
	"trace_id": "anyscale_portkey_test", # On Portkey, you can append feedback to a particular Trace ID
	"value": 1,
	"weight": 0.5
}

response = requests.post(url, headers=headers, data=json.dumps(data))

print(response.text)
```

### 5. Continuous Fine-Tuning

Once you start logging your requests and their feedback with Portkey, it becomes very easy to 1️) Curate & create data for fine-tuning, 2) Schedule fine-tuning jobs, and 3) Use the fine-tuned models!

Fine-tuning is currently enabled for select orgs - please request access on [Portkey Discord](https://discord.gg/sDk9JaNfK8) and we'll get back to you ASAP.

<img src="https://portkey.ai/blog/content/images/2023/11/fine-tune.gif" alt="header" width=600 />

#### Conclusion

Integrating Portkey with Anyscale helps you build resilient LLM apps from the get-go. With features like semantic caching, observability, load balancing, feedback, and fallbacks, you can ensure optimal performance and continuous improvement.

[Read full Portkey docs here.](https://docs.portkey.ai/)

Reach out to the Portkey team <a href="https://discord.gg/sDk9JaNfK8" target="_blank"><img src="https://img.shields.io/discord/1143393887742861333?logo=discord" alt="Discord"></a>
