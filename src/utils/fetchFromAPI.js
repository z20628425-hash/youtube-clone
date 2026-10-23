const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

export const fetchFromAPI = async (url) => {
  if (!API_KEY) {
    throw new Error(
      'RapidAPI kaliti topilmadi. Loyihaning ildizidagi .env.local fayliga REACT_APP_RAPIDAPI_KEY ni kiriting.'
    );
  }

  const response = await fetch(`${BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  });

  if (!response.ok) {
    throw new Error(`RapidAPI so'rovi bajarilmadi (${response.status} ${response.statusText}).`);
  }

  return response.json();
};