import {getRequestConfig} from 'next-intl/server';
// import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
//   const lang = cookies();
//   console.log(lang);
  
  const locale = 'de';
 
  return {
    locale,
    messages: (await import(`../src/${locale}.json`)).default
  };
});