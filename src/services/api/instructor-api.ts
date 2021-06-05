// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** GET /api/instructors */
export async function getItems(
  params: {
    // query
    /** Current page */
    current?: number;
    /** Page size */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.InstructorList>('/api/instructors', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POST /api/instructors */
export async function addItem(options?: { [key: string]: any }) {
  return request<API.InstructorListItem>('/api/instructors', {
    method: 'POST',
    ...(options || {}),
  });
}

/** PUT /api/instructors */
export async function updateItem(options?: { [key: string]: any }) {
  return request<API.InstructorListItem>('/api/instructors', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** DELETE /api/instructors */
export async function removeItem(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/instructors', {
    method: 'DELETE',
    ...(options || {}),
  });
}
