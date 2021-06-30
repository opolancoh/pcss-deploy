// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

import { apiRootUrl } from '@/app-config';

const entityPath = 'Instructor';

export async function getAll(
  params: {
    // query
    /** Current page */
    current?: number;
    /** Page size */
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<ANT.ProTableDataSource> {
  const response = await request<API.GetAllResponse>(
    `${apiRootUrl}/api/${entityPath}/GetInstructores`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
  return {
    data: response.data,
    success: true,
    total: response.paging.total,
  };
}

export async function getOne(id: number) {
  return request(`${apiRootUrl}/api/${entityPath}/${id}`, {
    method: 'GET',
  });
}

export async function addOne(data: API.Instructor, options?: { [key: string]: any }) {
  console.log('/api/instructors addItem data:', data);
  return request<API.Instructor>(`${apiRootUrl}/api/${entityPath}`, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function updateOne(data: API.Instructor, options?: { [key: string]: any }) {
  return request<API.Instructor>(`${apiRootUrl}/api/${entityPath}/${data.personaId}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

export async function removeOne(id: number) {
  return request(`${apiRootUrl}/api/${entityPath}/${id}`, {
    method: 'DELETE',
  });
}
