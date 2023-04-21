import PageComposition from "@/src/components/uniform/PageComposition";
import {
  withUniformGetStaticProps,
  withUniformGetStaticPaths,
} from "@uniformdev/canvas-next/project-map";
import {getCompositionsForNavigation, canvasClient} from "@/uniformlib/canvasClient";
import {enhancerBuilder} from "@/uniformlib/enhancers";
import {
  enhance,
} from "@uniformdev/canvas";
import { localize } from '@uniformdev/canvas';


export const getStaticProps = withUniformGetStaticProps({
  param: "slug",
  preview: process.env.NODE_ENV === "development",
  callback: async (context, composition) => {
    if (composition) {
      await enhance({composition, enhancers: enhancerBuilder, context});
    }
    // console.log(' context.locale', context.locale)
    // console.log(' context.defaultLocale', context.defaultLocale)
    // console.log('composition===============', JSON.stringify(composition))
    const locale = context.locale || context.defaultLocale || 'en_ca';
    await localize({
      composition,
      locale: ({ locales }) => {
        if (locales) {
          return locales.toString()
        }
        return 'en_ca';
      }
    });
    const {preview = false} = context || {};
    const navLinks = await getCompositionsForNavigation(preview);
    return {
      // Enhanced composition data will be injected later, so no need to do it yourself
      props: {
        navLinks,
        preview,
        locale,
      },
      // Specifying some NextJS ISG params per page.
      // revalidate: 100,
    };
  },
});

export const getStaticPaths = withUniformGetStaticPaths({
  preview: process.env.NODE_ENV === "development",
});

export default PageComposition;

// ===========================================================================
// Low- level implementation of getStaticProps without the canvas-next helpers
// ===========================================================================
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const canvasClient = new CanvasClient({
//     apiKey: process.env.UNIFORM_API_KEY,
//     apiHost: process.env.UNIFORM_CLI_BASE_URL,
//     projectId: process.env.UNIFORM_PROJECT_ID,
//   });
//
//   const pathString = `/${context?.params?.id ?? ''}`;
//   const { preview } = context;
//
//   const { composition } = await canvasClient.getCompositionByNodePath({
//     projectMapNodePath: pathString,
//     state: process.env.NODE_ENV === "development" || preview
//       ? CANVAS_DRAFT_STATE
//       : CANVAS_PUBLISHED_STATE,
//   });
//
//   const navLinks = await getCompositionsForNavigation(preview);
//
//   return {
//     props: {
//       navLinks,
//       data: composition,
//       preview: Boolean(preview),
//     },
//   };
// }

// ===========================================================================
// Low- level implementation of getStaticPaths without the canvas-next helpers
// ===========================================================================
// export const getStaticPaths = async () => {
//   const canvasClient = new ProjectMapClient({
//     apiKey: process.env.UNIFORM_API_KEY,
//     apiHost: process.env.UNIFORM_CLI_BASE_URL,
//     projectId: process.env.UNIFORM_PROJECT_ID,
//   });
//
//   const res = await canvasClient.getNodes({
//     state: process.env.NODE_ENV === "development"
//       ? CANVAS_DRAFT_STATE
//       : CANVAS_PUBLISHED_STATE,
//   });
//
//   const paths = res.nodes?.map((node) => node.path);
//
//   return { paths, fallback: true };
// }
