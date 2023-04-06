import Hero  from "./Hero";
import Title  from "./Title";
import Button from "../common/button"
import {
  ComponentProps,
  registerUniformComponent,
  createComponentStoreResolver,
  DefaultNotImplementedComponent,
  componentStore,
} from "@uniformdev/canvas-react";
import { isDevelopmentEnvironment } from "@/uniformlib/helpers/environmentUtilities";

const components: UniformComponent[] = [
  {
    // array for all integration id
    types:[
       'hero'
    ],
    component: Hero,
  } ,
  {
    types:[
       'title'
    ],
    component: Title,
  } ,
  {
    types:[
       'button'
    ],
    component: Button,
  }
];

components.forEach((component: UniformComponent) => {
  component.types.forEach((type: string) => {
    if (isDevelopmentEnvironment()) {
      if (component.variantId !== undefined) {
        console.log(
          `Registered component of type: ${type} with variant: ${component.variantId}`
        );
      } else {
        console.log(`Registered component of type: ${type}`);
      }
    }
    registerUniformComponent({
      type,
      component: component.component,
      variantId: component.variantId,
    });
  });
});

type UniformComponent = {
  types: string[];
  variantId?: string;
  component: React.ComponentType<ComponentProps<any>>;
};

export const RenderComponentResolver = () => {
  return createComponentStoreResolver({
    store: componentStore,
    defaultComponent: DefaultNotImplementedComponent,
  });
};
