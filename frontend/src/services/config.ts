let runtimeConfig: { SERVER_API_URL: string } = { SERVER_API_URL: "" };

export const loadConfig = async () => {
  const res = await fetch("/config.json");
  runtimeConfig = await res.json();
};

export const getApiUrl = () => runtimeConfig.SERVER_API_URL;