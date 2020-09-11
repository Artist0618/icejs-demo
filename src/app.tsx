import * as React from 'react';
import { createApp } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';
import { Avatar } from '@alifd/next';
const locale = getLocale();

const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    ),
  },
  request: {
    // 可选的，全局设置 request 是否返回 response 对象，默认为 false
    withFullResponse: false,

    baseURL: '',
    headers: {
      Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sYXJhYmJzLnRlc3QiLCJpYXQiOjE1OTk3MjY1MzQsImV4cCI6MTYzMTI2MjUzNCwibmJmIjoxNTk5NzI2NTM0LCJqdGkiOiJsc2RLYWJiTm81RUxOTWlJIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xTkg285HxvlIqhXmHPYGOTrnbdE5ghfEnMIpTlPKoEE'
    },
    // ...RequestConfig 其他参数
    // interceptors: {
    //   request: {
    //     onConfig: (config) => {
    //       // 发送请求前：可以对 RequestConfig 做一些统一处理
    //       config.headers = { a: 1 };
    //       return config;
    //     },
    //     onError: (error) => {
    //       return Promise.reject(error);
    //     }
    //   },
    //   response: {
    //     onConfig: (response) => {
    //       // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
    //       // if (!response.data.status !== 1) {
    //       //   alert('请求失败');
    //       // }
    //       // return response;
    //       let res = response.data;
    //       return res;
    //     },
    //     onError: (error) => {
    //       // 请求出错：服务端返回错误状态码
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //       return Promise.reject(error);
    //     }
    //   },
    // }
  }
};


createApp(appConfig);
