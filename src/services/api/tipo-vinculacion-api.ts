// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

import { serverUrl } from '@/app-config';

/** GET All */
export async function getAll() {
  return request<API.TipoVinculacionList>(`${serverUrl}/api/TipoVinculacion`, {
    method: 'GET',
  });
}
