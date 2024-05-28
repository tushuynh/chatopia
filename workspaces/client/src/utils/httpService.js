import axios from 'axios';

export const API_ROUTER = {
  users: {
    friends: '/users/:id/friends',
    setAvatar: '/users/:id/setAvatar',
    setDisplayName: '/users/:id/setDisplayName',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  messages: {
    getMessage: '/messages',
    sendMessage: '/messages',
  },
};

class HttpService {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      timeout: 3000,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpService();
    }

    return this.instance;
  }

  get(url, config) {
    return this.instance.get(url, config);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }
}

export const httpService = HttpService.getInstance();
