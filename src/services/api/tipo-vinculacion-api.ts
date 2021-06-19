// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** GET All */
export async function getAll() {
  return request<API.TipoVinculacionList>('/api/TipoVinculacion', {
    method: 'GET',
  });
}
