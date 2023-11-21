# Portkey + Anyscale
Portkey helps bring Anyscale APIs to production with its abstractions for observability, fallbacks, caching, and more. Use the Anyscale API **through** Portkey for:
1. **Enhanced Logging**: Track API use with detailed insights.
2. **Production Reliability**: Automated fallbacks, load balancing, and caching.
3. **Continuous Improvement**: Collect and apply user feedback.
4. **Enhanced Fine-Tuning**: Combine logs & user feedback for targetted fine-tuning.

### 1.1 Setup & Logging
1. Set `$ export OPENAI_API_KEY=ANYSCALE_API_KEY`
2. Obtain your [**Portkey API Key**](https://app.portkey.ai/).
3. Switch to **Portkey Gateway URL:** `https://api.portkey.ai/v1/proxy`

See full logs of requests (latency, cost, tokens)—and dig deeper into the data with their analytics suite.
```py
import openai

PORTKEY_GATEWAY_URL = "https://api.portkey.ai/v1/proxy"

PORTKEY_HEADERS = {
	'Authorization': 'Bearer ANYSCALE_KEY',
	'Content-Type': 'application/json',
	# **************************************
	'x-portkey-api-key': 'PORTKEY_API_KEY', 	# Get from https://app.portkey.ai/,
	'x-portkey-mode': 'proxy anyscale' 		# Tell Portkey that the request is for Anyscale
	# **************************************
}

client = openai.OpenAI(base_url=PORTKEY_GATEWAY_URL, default_headers=PORTKEY_HEADERS)

response = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.1",
    messages=[{"role": "user", "content": "Say this is a test"}]
)

print(response.choices[0].message.content)
```
### 1.2. Enhanced Observability
* **Trace** requests with single id.
* **Append custom tags** for request segmenting & in-depth analysis.

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

PORTKEY_HEADERS = {
	'Authorization': 'Bearer ANYSCALE_KEY',
	'Content-Type': 'application/json',
	'x-portkey-api-key': 'PORTKEY_API_KEY',
	'x-portkey-mode': 'proxy anyscale',
	# **************************************
	'x-portkey-trace-id': TRACE_ID, 		# Send the trace id
	'x-portkey-metadata': json.dumps(METADATA) 	# Send the metadata
	# **************************************
}

client = openai.OpenAI(base_url=PORTKEY_GATEWAY_URL, default_headers=PORTKEY_HEADERS)

response = client.chat.completions.create(
	model="mistralai/Mistral-7B-Instruct-v0.1",
	messages=[{"role": "user", "content": "Say this is a test"}]
)

print(response.choices[0].message.content)
```

### 2. Caching, Fallbacks, Load Balancing
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

PORTKEY_HEADERS = {
	'Content-Type': 'application/json',
	'x-portkey-api-key': 'PORTKEY_API_KEY',
	'x-portkey-mode': 'proxy anyscale',
	# **************************************
	'x-portkey-config': 'CONFIG_KEY'
	# **************************************
}

client = openai.OpenAI(base_url=PORTKEY_GATEWAY_URL, default_headers=PORTKEY_HEADERS)

response = client.chat.completions.create(
	model="mistralai/Mistral-7B-Instruct-v0.1",
	messages=[{"role": "user", "content": "Say this is a test"}]
)

print(response.choices[0].message.content)
```

For more on Configs and other gateway feature like Load Balancing, [check out the docs.](https://docs.portkey.ai/portkey-docs/portkey-features/ai-gateway)

### 3. Collect Feedback
Gather weighted feedback from users and improve your app:
```py
import requests
import json

PORTKEY_FEEDBACK_URL = "https://api.portkey.ai/v1/feedback" # Portkey Feedback Endpoint

PORTKEY_HEADERS = {
	"x-portkey-api-key": "PORTKEY_API_KEY",
	"Content-Type": "application/json",
}

DATA = {
	"trace_id": "anyscale_portkey_test", # On Portkey, you can append feedback to a particular Trace ID
	"value": 1,
	"weight": 0.5
}

response = requests.post(PORTKEY_FEEDBACK_URL, headers=PORTKEY_HEADERS, data=json.dumps(DATA))

print(response.text)
```

### 4. Continuous Fine-Tuning

Once you start logging your requests and their feedback with Portkey, it becomes very easy to 1️) Curate & create data for fine-tuning, 2) Schedule fine-tuning jobs, and 3) Use the fine-tuned models!

Fine-tuning is currently enabled for select orgs - please request access on [Portkey Discord](https://discord.gg/sDk9JaNfK8) and we'll get back to you ASAP.

<img src="https://portkey.ai/blog/content/images/2023/11/fine-tune.gif" alt="header" width=600 />

#### Conclusion

Integrating Portkey with Anyscale helps you build resilient LLM apps from the get-go. With features like semantic caching, observability, load balancing, feedback, and fallbacks, you can ensure optimal performance and continuous improvement.

[Read full Portkey docs here.](https://docs.portkey.ai/) | [Reach out to the Portkey team.](https://discord.gg/sDk9JaNfK8)
