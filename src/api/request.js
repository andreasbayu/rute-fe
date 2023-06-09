import baseUrl from './baseUrl';

const request = async ({path, method, headers = {}, body}) => {
  const config = {
    method: method,
    headers:
      headers !== undefined
        ? {
            ...headers,
            Accept: '*/*',
            'Content-Type': 'application/json',
          }
        : {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
    body: !(body !== undefined) ? '' : JSON.stringify(body),
  };
  return await fetch(baseUrl + path, config);
};

export default request;
