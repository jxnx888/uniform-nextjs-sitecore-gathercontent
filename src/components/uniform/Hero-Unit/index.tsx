import styles from './index.module.scss'
import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

type HeroProps = ComponentProps<{
  dataSource?: {
    Title?: string;
    HeroImage?: string;
  };
}>;

// @ts-ignore
const Index: React.FC<HeroProps> =   ({ dataSource }: HeroProps) => {
  const { Title, HeroImage } = dataSource || {};
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title Hero-Unit: {Title}</h1>

      <img src={HeroImage} alt=""/>
    </div>
  );
}

export default Index;
