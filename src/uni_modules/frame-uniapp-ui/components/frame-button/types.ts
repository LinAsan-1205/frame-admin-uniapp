/**
 * 按钮形式
 * base: 基础按钮
 * outline: 线框按钮
 * dashed: 虚线按钮
 * text: 文字按钮
 */
export type FrameButtonVariant = 'base' | 'outline' | 'dashed' | 'text';

/**
 * 按钮主题
 * default: 默认色
 * primary: 品牌色
 * success: 成功色
 * warning: 警告色
 * danger: 危险色
 */
export type FrameButtonTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * 按钮尺寸
 * mini: 28px
 * small: 32px
 * medium: 40px
 * large: 48px
 */
export type FrameButtonSize = 'mini' | 'small' | 'medium' | 'large';

/**
 * 按钮形状
 */
export type FrameButtonShape = 'rounded' | 'pill' | 'square';

/**
 * uni-app button open-type
 */
export type FrameButtonOpenType =
  | 'contact'
  | 'share'
  | 'getPhoneNumber'
  | 'getRealtimePhoneNumber'
  | 'getUserInfo'
  | 'launchApp'
  | 'openSetting'
  | 'feedback'
  | 'chooseAvatar'
  | 'agreePrivacyAuthorization'
  | 'getAuthorize'
  | 'lifestyle'
  | 'contactShare';

/**
 * 支付宝小程序授权范围
 */
export type FrameButtonScope = 'phoneNumber' | 'userInfo';

export interface FrameButtonProps {
  /**
   * 按钮形式
   * @default 'base'
   */
  variant?: FrameButtonVariant;

  /**
   * 按钮主题
   * @default 'default'
   */
  theme?: FrameButtonTheme;

  /**
   * 按钮尺寸
   * @default 'medium'
   */
  size?: FrameButtonSize;

  /**
   * 按钮形状
   * @default 'pill'
   */
  shape?: FrameButtonShape;

  /**
   * 是否为块级元素
   * @default false
   */
  block?: boolean;

  /**
   * 是否为幽灵按钮（镂空按钮）
   * @default false
   */
  ghost?: boolean;

  /**
   * 是否为圆角按钮（兼容属性，映射到 shape）
   * @default true
   */
  round?: boolean;

  /**
   * 是否为细边框
   * @default false
   */
  hairline?: boolean;

  /**
   * 加载状态
   * @default false
   */
  loading?: boolean;

  /**
   * 加载图标颜色
   */
  loadingColor?: string;

  /**
   * 禁用状态
   * @default false
   */
  disabled?: boolean;

  /**
   * 图标类名
   */
  icon?: string;

  /**
   * 图标类名前缀，用于使用自定义图标
   * @default 'wd-icon'
   */
  classPrefix?: string;

  /**
   * 自定义背景色
   */
  backgroundColor?: string;

  /**
   * 自定义文字颜色
   */
  textColor?: string;

  /**
   * 自定义边框颜色
   */
  borderColor?: string;

  /**
   * 按钮的唯一标识，可用于设置隐私同意授权按钮的 id
   */
  buttonId?: string;

  /**
   * 按钮类型，用于表单提交
   */
  formType?: 'submit' | 'reset';

  /**
   * 微信开放能力
   */
  openType?: FrameButtonOpenType;

  /**
   * 支付宝小程序授权范围，当 open-type 为 getAuthorize 时有效
   */
  scope?: FrameButtonScope;

  /**
   * 指定按钮按下去的样式类
   * @default 'button-hover'
   */
  hoverClass?: string;

  /**
   * 按住后多久出现点击态，单位毫秒
   * @default 20
   */
  hoverStartTime?: number;

  /**
   * 手指松开后点击态保留时间，单位毫秒
   * @default 70
   */
  hoverStayTime?: number;

  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   * @default false
   */
  hoverStopPropagation?: boolean;

  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
   * @default 'en'
   */
  lang?: 'zh_CN' | 'zh_TW' | 'en';

  /**
   * 会话来源，openType="contact"时有效
   */
  sessionFrom?: string;

  /**
   * 会话内消息卡片标题，openType="contact"时有效
   */
  sendMessageTitle?: string;

  /**
   * 会话内消息卡片点击跳转小程序路径，openType="contact"时有效
   */
  sendMessagePath?: string;

  /**
   * 会话内消息卡片图片，openType="contact"时有效
   */
  sendMessageImg?: string;

  /**
   * 打开 APP 时，向 APP 传递的参数，openType="launchApp"时有效
   */
  appParameter?: string;

  /**
   * 是否显示会话内消息卡片，openType="contact"时有效
   * @default false
   */
  showMessageCard?: boolean;

  /**
   * 自定义按钮高度
   */
  customHeight?: string;

  /**
   * 自定义字体大小
   */
  customFontSize?: string;

  /**
   * 自定义按钮样式
   */
  customStyle?: string | Record<string, any>;

  /**
   * 自定义类名
   */
  customClass?: string;
}

export type FrameButtonClickEvent = MouseEvent | TouchEvent | Event;

export interface FrameButtonEmits {
  /**
   * 点击按钮时触发
   */
  (event: 'click', payload: FrameButtonClickEvent): void;

  /**
   * 获取用户信息回调，openType="getUserInfo"时有效
   */
  (event: 'getuserinfo', detail: any): void;

  /**
   * 客服消息回调，openType="contact"时有效
   */
  (event: 'contact', detail: any): void;

  /**
   * 获取用户手机号回调，openType="getPhoneNumber"时有效
   */
  (event: 'getphonenumber', detail: any): void;

  /**
   * 实时获取用户手机号回调，openType="getRealtimePhoneNumber"时有效
   */
  (event: 'getrealtimephonenumber', detail: any): void;

  /**
   * 打开授权设置页后回调，openType="openSetting"时有效
   */
  (event: 'opensetting', detail: any): void;

  /**
   * 打开 APP 成功的回调，openType="launchApp"时有效
   */
  (event: 'launchapp', detail: any): void;

  /**
   * 打开 APP 失败的回调，openType="launchApp"时有效
   */
  (event: 'error', detail: any): void;

  /**
   * 用户选择头像回调，openType="chooseAvatar"时有效
   */
  (event: 'chooseavatar', detail: any): void;

  /**
   * 用户同意隐私协议回调，openType="agreePrivacyAuthorization"时有效
   */
  (event: 'agreeprivacyauthorization', detail: any): void;
}

