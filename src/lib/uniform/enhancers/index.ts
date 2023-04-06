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
// import {contentfulArrayModelConverter} from "./gatherContent/gatherContentArrayModelConverter";
import {CANVAS_GATHERCONTENT_PARAMETER_TYPES} from "@uniformdev/canvas-gathercontent";
import {isDevelopmentEnvironment} from '@/uniformlib/helpers/environmentUtilities'

const {
  serverRuntimeConfig: {
    gatherContentConfig
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
