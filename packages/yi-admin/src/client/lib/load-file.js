
const loadedScript = {};

export async function loadScript (src) {
   if (!loadedScript[src]) {
      loadedScript[src] = new Promise((resolve, reject) => {
         const script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = src;
         script.onload = resolve;
         script.onerror = reject;
         document.getElementsByTagName('head')[0].appendChild(script);
      });
   }
   return loadedScript[src];
}

const loadedStyle = {};

export async function loadStyle (src) {
   if (!loadedStyle[src]) {
      return new Promise((resolve, reject) => {
         const link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = src;
         link.onload = resolve;
         link.onerror = reject;
         document.getElementsByTagName('head')[0].appendChild(link);
      });
   }

   return loadedStyle[src];
}


export async function loadScriptFromAssets (src) {
   // eslint-disable-next-line no-underscore-dangle
   return loadScript(`${window._ASSETS_PATH_}${src}`);
}

export async function loadStyleFromAssets (src) {
   // eslint-disable-next-line no-underscore-dangle
   return loadStyle(`${window._ASSETS_PATH_}${src}`);
}
