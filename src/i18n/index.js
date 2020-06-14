import I18n from 'i18n-js';
import translations from './languages';

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
