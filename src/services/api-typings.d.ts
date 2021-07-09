// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
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

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
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

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
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

  export type GetAllResponse = {
    data: any[];
    paging: {
      total: number;
    };
  };

  /** Instructor **/
  export type Instructor = {
    personaId: number;
    tipoIdentificacionId: number;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    tipoVinculacion: string;
    totalHorasMes: number;
    fechaInicioContrato: string;
    fechaFinContrato: string;
    coordinador?: string;
    competencia?: string;
    resultadoDeAprendizaje?: string;
    areaDeConocimiento?: string;
    tipoPersonaId?: number;
  };

  export type InstructorList = {
    data: Instructor[];
    total?: number;
    success?: boolean;
  };

  /** Tipo Identificacion **/
  export type TipoIdentificacion = {
    tipoIdentificacionId: number;
    descripcion: string;
  };
  export type TipoIdentificacionList = TipoIdentificacion[];

  /** Tipo Vinculacion **/
  export type TipoVinculacion = {
    tipoVinculacionId: number;
    descripcion: string;
  };
  export type TipoVinculacionList = TipoVinculacion[];

  /*** Tipo Vinculacion ***/
  export type TipoVinculacion = {
    tipoVinculacionId: number;
    descripcion: string;
  };
  export type TipoVinculacionList = TipoVinculacion[];

  /*** Sede ***/
  export type Sede = {
    sedeId: number;
    nombre: string;
    direccion: string;
    administradorSede: string;
  };
  export type SedeList = Sede[];


}
