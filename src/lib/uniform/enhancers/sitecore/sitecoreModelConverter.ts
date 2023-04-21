import {ComponentInstance} from "@uniformdev/canvas";

type ContentfulData = {
  fields: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLinkSlug?: string;
    image?: any;
    intro?: string;
    audience?: string;
    slug?: string;
    heading?: string;
    registeredText?: string;
    homeLinkText?: string;
    success?: string;
  };
};

const transformImage = (image: any | undefined) => {
  debugger
  console.log('model convert image:', image)

  if (!image) return {};
  let {url} = image || {};
  if (url && url.startsWith("//")) {
    url = url.replace("//", "https://");
  }

  // const { width, height } = image.fields?.file?.details?.image || {};
  return {
    src: url,
    alt: 'test',
    // ...(width && height ? { width, height } : {}),
  };
};

export const sitecoreModelConverter = ({
                                              component,
                                              parameter,
                                            }: {
  component: ComponentInstance;
  parameter: any;
}) => {
  const data = parameter?.value as any | undefined;

  if (!data) return {};
  // Uniform Component ID
  switch (component.type) {
    case 'hero2':
      return data
    case 'heroUnit':
      return data
    default:
      return {};
  }
};
