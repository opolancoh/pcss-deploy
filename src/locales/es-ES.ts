import app from './es-ES/app';
import component from './es-ES/component';
import globalHeader from './es-ES/globalHeader';
import menu from './es-ES/menu';
import pages from './es-ES/pages';
import pwa from './es-ES/pwa';
import request from './es-ES/request';
import settingDrawer from './es-ES/settingDrawer';
import settings from './es-ES/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...app,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
  ...request,
};
