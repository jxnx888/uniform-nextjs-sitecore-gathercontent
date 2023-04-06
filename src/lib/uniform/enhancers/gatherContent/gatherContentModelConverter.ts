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

export const gatherContentModelConverter = ({
                                              component,
                                              parameter,
                                            }: {
  component: ComponentInstance;
  parameter: any;
}) => {
  const data = parameter?.value[0] as any | undefined;
  debugger
  console.log('component.type', component.type)
  console.log('data?.mappedConten?.image?.value[0]', data?.mappedConten?.image?.value[0])

  if (!data) return {};
  // Uniform Component ID
  switch (component.type) {
    case 'hero':
      return transformImage(data?.mappedContent?.image?.value[0])
    case 'button':
      return {
        title: data?.mappedContent?.title?.value || "",
        description: data?.mappedContent?.description || "",
        image: transformImage(data?.mappedConten?.image?.value[0]),
      };
    default:
      return {};
  }
};
