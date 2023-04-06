import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

type IProps = ComponentProps<{
  type: string;
  content:any;
  description?: string;
}>;

const Index: React.FC<IProps> = ({ type,content, description }: IProps) => (
  <div>
    {
      'h1'===type && <h1>{content}</h1>
    }
    {
      'h2' === type && <h2>{content}</h2>
    }
    {
      'h3'===type && <h3>{content}</h3>
    }
    <div
      className="description"
      // @ts-ignore
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);

export default Index;
