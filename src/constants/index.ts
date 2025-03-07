import envPaths from 'env-paths';
import { osLocaleSync } from 'os-locale';

export const LOCALE_CODE = osLocaleSync();

export const cacheDirectory = envPaths('@kabeep/forex-cli').cache;
