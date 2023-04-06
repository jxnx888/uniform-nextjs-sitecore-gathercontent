import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { RootComponentInstance } from "@uniformdev/canvas";
import {
  UniformComposition,
  UniformSlot,
  createUniformApiEnhancer,
} from "@uniformdev/canvas-react";
import { ToggleEmbeddedContextDevTools } from "@uniformdev/context-devtools";
import Navigation, { NavLink } from "./Navigation";
import { UniformDeployedPreviewBanner } from '@/src/components/uniform/UniformDeployedPreviewBanner';
import styles from '@/src/assets/styles/uniform.module.scss'

const { serverRuntimeConfig } = getConfig();
const { projectId, apiKey, apiHost } = serverRuntimeConfig;

export interface PageCompositionProps {
  preview: boolean;
  data: RootComponentInstance;
  navLinks: Array<NavLink>;
}

export default function PageComposition({
  preview,
  data: composition,
  navLinks,
}: PageCompositionProps) {
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: "/api/preview",
  });

  const { metaTitle } = composition?.parameters || {};
  return (
    <div className={styles.uniform_container}>
      <UniformDeployedPreviewBanner />
      <main className="main">
        <Navigation navLinks={navLinks} />
        <UniformComposition
          data={composition}
          contextualEditingEnhancer={contextualEditingEnhancer}
        >
          <UniformSlot name="content" />
        </UniformComposition>
        <ToggleEmbeddedContextDevTools
          initialSettings={{
            apiHost: apiHost,
            apiKey: apiKey,
            projectId: projectId,
          }}
        />
      </main>
    </div>
  );
}
