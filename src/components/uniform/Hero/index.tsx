import styles from './index.module.scss'
import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

type HeroProps = ComponentProps<{
  title: string;
  image:any;
  description?: string;
}>;

// @ts-ignore
const Index: React.FC<HeroProps> = (props: HeroProps) => {
  const { title, image, description } = props
  console.log('props',props)
  console.log( JSON.stringify(image, null, 2))
 return (
    <div className={styles.container}>
      <h1 className={styles.title}>H1: {title}</h1>

      <img src={image.src} alt=""/>
      <div
        className="description"
        // @ts-ignore
        dangerouslySetInnerHTML={{__html: description}}
      />
    </div>
  );
}

export default Index;
