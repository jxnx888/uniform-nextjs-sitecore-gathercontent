import {GetStaticPropsContext} from "next";

import {
  createGatherContentEnhancer,
  GatherContentClient,
  GatherContentClientList,
} from '@uniformdev/canvas-gathercontent';
import getConfig from "next/config";


export const gatherContentEnhancer = () => {

  const {
    serverRuntimeConfig: {
      gatherContentConfig
    }
  } = getConfig();
  if (!gatherContentConfig.GATHER_CONTENT_API_KEY || !gatherContentConfig.GATHER_CONTENT_USERNAME || !gatherContentConfig.GATHER_CONTENT_PROJECT_ID) {
    throw "GatherContent connection details are not configured";
  }
  const client = new GatherContentClient({
    apiKey: gatherContentConfig.GATHER_CONTENT_API_KEY,
    apiUsername: gatherContentConfig.GATHER_CONTENT_USERNAME,
    projectId: gatherContentConfig.GATHER_CONTENT_PROJECT_ID
  });
  const clients = new GatherContentClientList({client});
  return createGatherContentEnhancer({clients});
}
