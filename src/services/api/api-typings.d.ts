// @ts-ignore

export type CurrentUser = {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: { key?: string; label?: string }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  geographic?: {
    province?: { label?: string; key?: string };
    city?: { label?: string; key?: string };
  };
  address?: string;
  phone?: string;
};

export type LoginResult = {
  status?: string;
  type?: string;
  currentAuthority?: string;
};

export type PageParams = {
  current?: number;
  pageSize?: number;
};

export type Instructor = {
  key?: number;
  clavePersona?: number;
  nombrePersona: string;
  tipoVinculacion: string;
  totalHorasMes: number;
  fechaInicioContrato?: string;
  fechaFinContrato?: string;
  coordinador?: string;
  areaDeConocimiento: string;
  resultadoDeAprendizaje?: string;
};

export type InstructorList = {
  data?: InstructortItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

export type RuleListItem = {
  key?: number;
  disabled?: boolean;
  href?: string;
  avatar?: string;
  name?: string;
  owner?: string;
  desc?: string;
  callNo?: number;
  status?: number;
  updatedAt?: string;
  createdAt?: string;
  progress?: number;
};

export type RuleList = {
  data?: RuleListItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

export type FakeCaptcha = {
  code?: number;
  status?: string;
};

export type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
};

export type ErrorResponse = {
  /** 业务约定的错误码 */
  errorCode: string;
  /** 业务上的错误信息 */
  errorMessage?: string;
  /** 业务上的请求是否成功 */
  success?: boolean;
};

export type NoticeIconList = {
  data?: NoticeIconItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

export type NoticeIconItemType = 'notification' | 'message' | 'event';

export type NoticeIconItem = {
  id?: string;
  extra?: string;
  key?: string;
  read?: boolean;
  avatar?: string;
  title?: string;
  status?: string;
  datetime?: string;
  description?: string;
  type?: NoticeIconItemType;
};
