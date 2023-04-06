import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";
import createUniformContext from "@/uniformlib/uniformContext";// IMPORTANT: importing all components registered in Canvas
import "@/src/components/uniform/canvasComponents";

import "@/styles/styles.css";

const clientContext = createUniformContext();

function MyApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps) {
  return (
    <UniformContext
      context={serverUniformContext ?? clientContext}
      outputType={"standard"}
      // enable for edge-side rendering
      //outputType={"edge"}
    >
      <Component {...pageProps} />
    </UniformContext>
  );
}

export default MyApp;
