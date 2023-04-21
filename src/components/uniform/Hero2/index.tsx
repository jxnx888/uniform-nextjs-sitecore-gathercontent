import styles from './index.module.scss'
import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

type HeroProps = ComponentProps<{
  title: {
    Title:string
  };
  image: {
    HeroImage:string
  };
  description?: string;
}>;

// @ts-ignore
const Index: React.FC<HeroProps> = (props: HeroProps) => {
  const {title, image,} = props
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title: {title?.Title}</h1>

      <img src={image?.HeroImage} alt=""/>
    </div>
  );
}

export default Index;
