import { Student } from 'types/student.type'
import http from 'utils/http'

export const getStudents = (page: number | string, limit: number | string) =>
  http.get('/students', {
    params: {
      _page: page,
      _limit: limit
    }
  })

export const getStudent = (id: number | string) => http.get(`/students/${id}`)

export const addStudent = (student: Omit<Student, 'id'>) => http.post<Student>('/students', student)

export const updataStudent = (id: number | string, student: Student) => http.put(`/students/${id}`, student)

export const deleteStudent = (id: number | string) => http.delete(`/students/${id}`)
