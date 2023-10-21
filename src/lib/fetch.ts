import axios from 'axios';

const URL = 'https://dev-mrp.insby.tech/api';
const username =
  'hQtwpolwKTjUkNAkZGeSiOkhp2OP8UA6TAPyA7bOWLFXTPPJOMzQUOOhLg43uXoFIuA5T4yKySJnHZhhVNWBqfNLcaKBfrAx';
const password =
  'lolci3wdjsHDhFsQOnubYma5Zl33BPwE4NA5wftU9qxJnmIkP3ju8qw0F6ECjF4kvmp3SwNuLZrEMQezkFHqOMYjCBVJJzxv';

// Initial API call to acquire bearer token
const postInitApp = async () => {
  try {
    const credentials = `${username}:${password}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    const headers = {
      Authorization: `Basic ${base64Credentials}`,
    };

    const response = await axios.post(
      `${URL}/v2/init/app`,
      {
        uuid: '24d40c18-38be-45ba-b803-d8927a2125ac',
        uuidOS: 'Windows',
      },
      { headers }
    );

    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};

const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN;
const headers = {
  Authorization: `Bearer ${bearerToken}`,
};

const getProducts = async () => {
  try {
    // Retrieve the Bearer token from the environment variable
    if (!bearerToken) {
      throw new Error('Bearer token is not set.');
    }
    const response = await axios.get(`${URL}/v2/session/product`, {
      headers,
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error making GET request:', error);
    throw error;
  }
};

const api = axios.create({
  baseURL: URL,
  headers,
});

export { postInitApp, getProducts, api };
