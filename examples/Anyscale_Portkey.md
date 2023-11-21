# Portkey Integration

**Portkey** is a full-stack LLMOps platform that brings your Anyscale APIs to production reliably.

### Start logging your Anyscale requests

See full log of your requests, latency, cost, tokens used per request and dig deeper with Portkey's advanced analytics suite. 
1. Get [Portkey API Key](https://app.portkey.ai/)
2. And switch to Portkey proxy - that's all!

```py
import requests

url = 'https://api.portkey.ai/v1/chat/completions' # Portkey gateway URL

headers = {
    'Authorization': Bearer ANYSCALE_KEY',
    'x-portkey-api-key': 'PORTKEY_API_KEY', # Get from https://app.portkey.ai/,
    'x-portkey-mode': 'proxy anyscale', # Setup the proxy
    'Content-Type': 'application/json'
}

data = {
    "messages": [{"role": "user", "content": "What happens when you mix red & yellow?"}],
    "model": "mistralai/Mistral-7B-Instruct-v0.1"
}

response = requests.post(url, headers=headers, json=data)

print(response.text)
```
**Your request should now be logged at** ➡️ https://app.portkey.ai/

### Advanced Observability Features
* **Requests Tracing**: Understand the journey of each request for optimization.
* **Custom Tags**: Segment and categorize requests for better insights.

Just add their relevant headers to your reuqest:

```py
import json

TRACE_ID = 'anyscale_portkey_test'

METADATA = {
    "_environment": "production",
    "_user": "userid123",
    "_organisation": "orgid123",'
    "_prompt": "summarisationPrompt"
}

headers = {
    'Authorization': Bearer ANYSCALE_KEY',
    'x-portkey-api-key': 'PORTKEY_API_KEY', # Get from https://app.portkey.ai/,
    'x-portkey-mode': 'proxy anyscale', # Setup the proxy
    'Content-Type': 'application/json',
    'x-portkey-trace-id': TRACE_ID, # Send the trace id
    'x-portkey-metadata': json.dumps(METADATA) # Send the metadata
}

data = data # Same as the above code block

url = url # Same as the above code block

response = requests.post(url, headers=headers, json=data)

print(response.text)
```

### Caching, Fallbacks, Load Balancing
* **Automated Fallbacks & Retries**: Ensure your application remains functional even if a primary service fails.
* **Load Balancing**: Efficiently distribute incoming requests among multiple models.
* **Semantic Caching**: Reduce costs and latency by intelligently caching results.

Toggle these features through Portkey's Config builder. Head to the **Configs** tab on [Portkey](https://app.portkey.ai) and create a new config. We want to enable semantic caching + fallback from Llama2 to Mistral. Your config would look like this:

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

Save this config and **copy the config key** - our fallback & caching logic is set! 

```py
url = 'https://api.portkey.ai/v1/chatComplete' # Switch to Portkey's gateway URL

headers = {
    'x-portkey-api-key': 'PORTKEY_API_KEY', # Get from https://app.portkey.ai/,
    'x-portkey-config': 'CONFIG_KEY',
    'Content-Type': 'application/json',
##  'x-portkey-mode': 'proxy anyscale', # This isn't needed anymore!
##  'Authorization': Bearer ANYSCALE_KEY' # This isn't needed anymore as well!
}

data = {
    "messages": [{"role": "user", "content": "What happens when you mix red & yellow?"}],
##  "model": "mistralai/Mistral-7B-Instruct-v0.1" # We've set the model upstream with the Config!
}

response = requests.post(url, headers=headers, json=data)

print(response.text)
```

For more on Configs, [check out the docs.](https://docs.portkey.ai/portkey-docs/portkey-features/ai-gateway/configs)

### Append Feedback to Requests

Portkey’s Feedback API offers a straightforward way to gather weighted feedback from users, allowing you to refine and improve over time.

Here’s how to utilize the Feedback API with Portkey:

```py
import requests
import json

url = "https://api.portkey.ai/v1/feedback" # Portkey Feedback Endpoint

headers = {
    "x-portkey-api-key": os.environ.get("PORTKEY_API_KEY"),
    "Content-Type": "application/json",
}

data = {"trace_id": "anyscale_portkey_test", "value": 1}

response = requests.post(url, headers=headers, data=json.dumps(data))

print(response.text)
```

### Continuous Fine-Tuning

Once you start logging your requests and their feedback with Portkey, it becomes very easy to 1️) Curate & create data for fine-tuning, 2) Schedule fine-tuning jobs, and 3) Use the fine-tuned models!

Fine-tuning is currently enabled for select orgs - please request access on [Portkey Discord](https://discord.gg/sDk9JaNfK8) and we'll get back to you ASAP.

<img src="https://portkey.ai/blog/content/images/2023/11/fine-tune.gif" alt="header" width=600 />

#### **Conclusion**

Integrating Portkey with Anyscale helps you build resilient LLM apps from the get-go. With features like semantic caching, observability, load balancing, feedback, and fallbacks, you can ensure optimal performance and continuous improvement.

By following this guide, you've set up and tested the Portkey integration with Anyscale. As you continue to build and deploy AI applications, remember to leverage the full potential of this integration!

For further assistance or questions, reach out to the developers ➡️ <br />
<a href="https://twitter.com/intent/follow?screen_name=portkeyai" target="_blank">
  <img src="https://img.shields.io/twitter/follow/portkeyai?style=social&logo=twitter" alt="Twitter">
</a>

Join our community of practitioners putting LLMs into production ➡️ <br />
<a href="https://discord.gg/sDk9JaNfK8" target="_blank">
  <img src="https://img.shields.io/discord/1143393887742861333?logo=discord" alt="Discord">
</a>
