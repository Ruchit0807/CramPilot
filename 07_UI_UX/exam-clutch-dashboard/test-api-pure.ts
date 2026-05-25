import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

async function main() {
  const url = process.env.FREEMODEL_BASE_URL + '/chat/completions';
  const key = process.env.FREEMODEL_API_KEY;
  console.log('Testing url:', url);
  
  const body = {
    model: 'gpt-5.5',
    messages: [{ role: 'user', content: 'Say hello world' }],
    max_tokens: 10
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(body)
    });
    
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Body:', text);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
main();
