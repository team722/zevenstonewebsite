import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/queries';

const injectRawHtml = (htmlString: string, target: HTMLElement) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  Array.from(tempDiv.childNodes).forEach(node => {
    if (node.nodeName.toLowerCase() === 'script') {
      const script = document.createElement('script');
      const oldScript = node as HTMLScriptElement;
      
      // Copy all attributes (like src, async, defer, type)
      Array.from(oldScript.attributes).forEach(attr => {
        script.setAttribute(attr.name, attr.value);
      });
      
      // Copy the inline script content
      script.text = oldScript.text;
      target.appendChild(script);
    } else {
      target.appendChild(node.cloneNode(true));
    }
  });
};

export const SeoScripts: React.FC = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });

  const injected = useRef(false);

  useEffect(() => {
    if (!siteSettings || injected.current) return;

    try {
      if (siteSettings.customHeaderScripts) {
        injectRawHtml(siteSettings.customHeaderScripts, document.head);
      }
      
      if (siteSettings.customBodyScripts) {
        injectRawHtml(siteSettings.customBodyScripts, document.body);
      }
      
      injected.current = true;
    } catch (error) {
      console.error("Error injecting custom SEO scripts from Sanity:", error);
    }
  }, [siteSettings]);

  return null;
};
