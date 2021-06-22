// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

import { serverUrl } from '@/app-config';

/** GET All */
/* export async function getAll(
  params: {
    // query
    // Current page 
    current?: number;
    // Page size 
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.InstructorGetAllResponse>(
    'https://senafichapi.azurewebsites.net/api/Instructor/GetInstructores',
    {
      method: 'GET',
      params: {
        ...params,
        page: params.current,
      },
      ...(options || {}),
    },
  );
} */
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
    `${serverUrl}/api/Instructor/GetInstructores`,
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

/** DELETE /api/instructors */
export async function getOne(id: number) {
  return request(`${serverUrl}/api/Instructor/${id}`, {
    method: 'GET',
  });
}

/** POST /api/instructors */
export async function addOne(options?: { [key: string]: any }) {
  console.log('/api/instructors addItem options:', options);
  return request<API.Instructor>(`${serverUrl}/api/Instructor`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** PUT /api/instructors */
export async function updateOne(options?: { [key: string]: any }) {
  return request<API.Instructor>(`${serverUrl}/api/Instructor`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** DELETE /api/instructors */
export async function removeOne(id: number) {
  return request(`${serverUrl}/api/Instructor/${id}`, {
    method: 'DELETE',
  });
}
