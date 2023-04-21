import getConfig from "next/config";
import {
  ComponentParameterEnhancer,
  ComponentParameterEnhancerFunction,
  compose,
  EnhancerBuilder,
} from "@uniformdev/canvas";
// import {CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES, CANVAS_CONTENTFUL_PARAMETER_TYPES, CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,} from "@uniformdev/canvas-contentful";
import {
  gatherContentEnhancer
} from "./gatherContent/gatherContentEnhancer";
import { gatherContentModelConverter } from "./gatherContent/gatherContentModelConverter";
import {CANVAS_GATHERCONTENT_PARAMETER_TYPES} from "@uniformdev/canvas-gathercontent";

// Sitecore
import {sitecoreEnhancer} from "@/uniformlib/enhancers/sitecore/sitecoreEnhancer";
import {sitecoreModelConverter} from "@/uniformlib/enhancers/sitecore/sitecoreModelConverter";
import { CANVAS_SITECORE_PARAMETER_TYPES } from "@uniformdev/canvas-sitecore";

import {isDevelopmentEnvironment} from '@/uniformlib/helpers/environmentUtilities'

const {
  serverRuntimeConfig: {
    gatherContentConfig,
    sitecoreConfig
  },
} = getConfig();


const enhancers: EnhancerConfiguration[] = [

  // @ts-ignore
  {
    name: "GatherContent",
    type: CANVAS_GATHERCONTENT_PARAMETER_TYPES,
    enhancer: gatherContentEnhancer,
    converter: gatherContentModelConverter,
    config: [
      gatherContentConfig.GATHER_CONTENT_API_KEY,
      gatherContentConfig.GATHER_CONTENT_USERNAME,
      gatherContentConfig.GATHER_CONTENT_PROJECT_ID
    ]
  },
  {
    name: "Sitecore",
    type: CANVAS_SITECORE_PARAMETER_TYPES,
    enhancer: sitecoreEnhancer,
    converter: sitecoreModelConverter,
    config: [
      sitecoreConfig.SITECORE_API_URL,
      sitecoreConfig.SITECORE_API_KEY,
      sitecoreConfig.SITECORE_SITENAME
    ]
  }

];

export const enhancerBuilder = new EnhancerBuilder();

enhancers.forEach((enhancer) => {
  if (enhancer.config.every((cfg) => cfg)) {
    enhancerBuilder.parameterType(
      enhancer.type,
      compose(enhancer.enhancer(), enhancer.converter)
    );

    if (isDevelopmentEnvironment()) {
      console.log(`Registered ${enhancer.name} Enhancer.`);
    }
  }
});

enhancerBuilder.parameter((e) => {
  // if (typeof e.parameter.value === "string") {
  //   return e.parameter.value.replace(/personalization/gi, "p13n");
  // }
});

type EnhancerConfiguration = {
  name: string | string[];
  type: string | readonly string[];
  enhancer: () => ComponentParameterEnhancer<any, any>;
  converter: ComponentParameterEnhancerFunction<any>;
  config: string[];
};
