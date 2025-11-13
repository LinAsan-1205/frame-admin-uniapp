import type { App } from 'vue';
import setupI18n from '@/locales';
import setupRequest from '@/utils/request';
import setupPermission from './permission';

export default {
  install(app: App) {
    setupI18n(app);
    setupPermission();
    setupRequest();
  },
};
