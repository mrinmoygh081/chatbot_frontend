import axios from "axios";

export const callAPI = async (method, slug, payload, token) => {
  let path = `${process.env.REACT_APP_BACKEND_API}/${slug}`;
  console.log(path);

  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: path,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Conditionally set the Content-Type based on the payload
    ...(payload instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }),
    data: payload,
  };

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
