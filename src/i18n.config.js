const { I18n } = require('i18n');
const path = require('path');
const i18n = new I18n({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  directory: path.join('./src/shared', 'localization')

});

module.exports = i18n;