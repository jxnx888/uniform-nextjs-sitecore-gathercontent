import {GetStaticPropsContext} from "next";

import { createItemEnhancer, getClient } from "@uniformdev/canvas-sitecore";
import getConfig from "next/config";

export const sitecoreEnhancer = ()=> {
  const {
    serverRuntimeConfig: {
      sitecoreConfig
    }
  } = getConfig();
  if (!sitecoreConfig.SITECORE_API_URL || !sitecoreConfig.SITECORE_API_KEY || !sitecoreConfig.SITECORE_SITENAME) {
    throw "Sitecore connection details are not configured";
  }

  const sitecoreEnhancer = createItemEnhancer({
    pageId: "id",
    config: {
      SITECORE_API_URL: sitecoreConfig.SITECORE_API_URL,
      SITECORE_SITENAME: sitecoreConfig.SITECORE_SITENAME,
      env: {
        SITECORE_API_KEY: sitecoreConfig.SITECORE_API_KEY,
      },
    },
    isPreview:true,
    logger: null,
    modelOnly: false, // enable modelOnly after configuring model builders in Sitecore for all components and parameters
  });

  return sitecoreEnhancer;
}
