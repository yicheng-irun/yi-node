
export async function loadScript (src) {
   return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.getElementsByTagName('head')[0].appendChild(script);
   });
}


export async function loadStyle (src) {
   return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      link.onload = resolve;
      link.onerror = reject;
      document.getElementsByTagName('head')[0].appendChild(link);
   });
}
