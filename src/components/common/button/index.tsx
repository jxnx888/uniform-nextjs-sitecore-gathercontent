import styles from './index.module.scss'
import {Button} from "antd";
import * as React from "react";

interface IProps {
  type?: "default" | "primary" | "ghost" | "dashed" | "link" | "text" | undefined
  onClick?: React.MouseEventHandler<HTMLElement>
  content: string
  danger?: boolean
  loading?: boolean | {
    delay?: number;
  };
  disabled?: boolean | undefined;
  size?: 'small' | 'middle' | 'large' | undefined;
  className?: string
}

const Index = (props: IProps) => {
  const {type = 'primary', onClick, size = 'large', content = 'Button', danger = false, loading, disabled, className} = props
  return (
    <div className={styles.btn}>
      <Button
        className={`${danger ? 'danger_btn' : ''} ${className}`}
        type={type}
        onClick={onClick}
        size={size}
        danger={danger}
        loading={loading}
        disabled={disabled}
      >
        {content}
      </Button>
    </div>
  );
}

export default Index