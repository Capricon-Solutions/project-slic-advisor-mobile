const apiUrl = `https://klkzp98p14.execute-api.ap-southeast-1.amazonaws.com/api/not_attending/${id}`;

const headers = {
  'x-api-key': apiKey, // Some APIs use 'x-api-key', check your API documentation
  'Content-Type': 'application/json',
};

const method = 'POST';

const body = {
  reason: 'Sick',
  comments: 'im sick and i cant attend to this',
};

const apiKey = 'your-api-key-here'; // Replace with your actual API key
