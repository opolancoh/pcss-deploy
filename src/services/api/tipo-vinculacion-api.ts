// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

import { apiRootUrl } from '@/app-config';

/** GET All */
export async function getAll() {
  return request<API.TipoVinculacionList>(`${apiRootUrl}/api/TipoVinculacion`, {
    method: 'GET',
  });
}
