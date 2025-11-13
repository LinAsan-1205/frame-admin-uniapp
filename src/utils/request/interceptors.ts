import type {
  HttpError,
  HttpRequestAbstract,
  HttpRequestConfig,
  HttpResponse,
} from 'uview-plus/libs/luch-request/index';
import { clearToken, getToken } from '@/utils/auth';
import storage from '@/utils/storage';
import { showMessage } from './status';

const TOAST_DURATION = 2500;

const safeToast = (message: string) => {
  if (!message) {
    return;
  }
  uni.showToast({
    title: message,
    icon: 'none',
    duration: TOAST_DURATION,
  });
};

// 防止重复提交
const repeatSubmit = (config: HttpRequestConfig) => {
  const requestObj = {
    url: config.url,
    data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
    time: Date.now(),
  };
  const sessionObj = storage.getJSON('sessionObj');
  if (!sessionObj) {
    storage.setJSON('sessionObj', requestObj);
  }
  else {
    const s_url = sessionObj.url; // 请求地址
    const s_data = sessionObj.data; // 请求数据
    const s_time = sessionObj.time; // 请求时间
    const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
    if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
      const message = '数据正在处理，请勿重复提交';
      console.warn(`[${s_url}]: ${message}`);
      return Promise.reject(new Error(message));
    }
    else {
      storage.setJSON('sessionObj', requestObj);
    }
  }
};

function requestInterceptors(http: HttpRequestAbstract) {
  /**
   * 请求拦截
   * @param {object} http
   */
  http.interceptors.request.use(
    (config: HttpRequestConfig) => {
      config.data = config.data || {};
      const custom = config?.custom;

      const isTokenDisabled = custom?.auth === false;
      if (getToken() && !isTokenDisabled && config.header) {
        config.header.token = getToken();
      }

      if (custom?.loading) {
        uni.showLoading({
          title: '加载中',
          mask: true,
        });
      }

      const isRepeatSubmitDisabled = custom?.repeatSubmit === false;
      if (!isRepeatSubmitDisabled && (config.method === 'POST' || config.method === 'UPLOAD')) {
        repeatSubmit(config);
      }
      return config;
    },
    (config: any) => Promise.reject(config),
  );
}

function responseInterceptors(http: HttpRequestAbstract) {
  http.interceptors.response.use((response: HttpResponse) => {
    const data = response.data;
    const config = response.config;
    const custom = config?.custom;

    if (data.code === 401) {
      clearToken();
      if (custom?.toast !== false) {
        safeToast('登录状态失效，请重新授权');
      }
      return Promise.reject(data);
    }

    if (custom?.loading) {
      uni.hideLoading();
    }

    if (data.code === 200) {
      return response || {};
    }

    if (custom?.toast !== false) {
      safeToast(data.message || '请求失败');
    }

    return Promise.reject(data);
  }, (response: HttpError) => {
    const custom = response.config?.custom;

    if (custom?.loading !== false) {
      uni.hideLoading();
    }

    if (custom?.toast !== false) {
      const message = response.statusCode ? showMessage(response.statusCode) : '网络连接异常,请稍后再试!';
      safeToast(message);
    }

    return Promise.reject(response);
  });
}

export { requestInterceptors, responseInterceptors };
