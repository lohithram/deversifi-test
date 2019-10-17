const SERVICE_BASE_URL = "https://api-pub.bitfinex.com/v2/ticker";

export const getService = (url: string) => (
  fetch(SERVICE_BASE_URL+url).
    then(response => response.json())
)
