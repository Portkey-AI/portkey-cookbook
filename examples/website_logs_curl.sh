curl https://api.portkey.ai/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "x-portkey-api-key: $PORTKEY_API_KEY" \
  -H "x-portkey-provider: openai" \
  -d '{
    "model": "gpt-4",
    "messages":[{"role": "user", "content": "Bob the Builder.."}]
  }'
