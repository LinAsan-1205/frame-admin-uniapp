export type FrameButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';
export type FrameButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type FrameButtonSize = 'small' | 'medium' | 'large';
export type FrameButtonShape = 'rounded' | 'pill' | 'square';

export interface FrameButtonProps {
  variant?: FrameButtonVariant;
  theme?: FrameButtonTheme;
  size?: FrameButtonSize;
  shape?: FrameButtonShape;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export type FrameButtonClickEvent = MouseEvent | TouchEvent | Event;

export type FrameButtonEmits = {
  (event: 'click', payload: FrameButtonClickEvent): void;
};
