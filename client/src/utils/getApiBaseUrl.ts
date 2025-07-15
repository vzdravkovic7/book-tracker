export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (envUrl && location.hostname !== "localhost" && !location.hostname.includes("127.0.0.1")) {
    // Inside Docker or deployed container
    return envUrl;
  }

  // Running locally in browser
  return "http://localhost:5000/api";
};

// For non-API uses like WebSockets
export const getSignalRBaseUrl = () => {
  return getApiBaseUrl().replace(/\/api\/?$/, "");
};

// For accessing static files like images
export const getStaticBaseUrl = () => {
  return getApiBaseUrl().replace(/\/api\/?$/, "");
};
