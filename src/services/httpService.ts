const SERVICE_BASE_URL = "https://www.demo.salmon-gcp.com/search/resources/store/1";

export const getService = (url: string) => (
  fetch(SERVICE_BASE_URL+url).
    then(response => response.json())
)
