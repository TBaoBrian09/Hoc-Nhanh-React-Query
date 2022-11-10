import { deleteStudent, getStudents } from 'apis/student.api'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useQueryString } from 'utils/utils'
import classNames from 'classnames'
import { toast } from 'react-toastify'

const LIMIT = 10
export default function Students() {
  const queryClient = useQueryClient()
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1

  const studentQuery = useQuery({
    queryKey: ['students', page],
    queryFn: () => getStudents(page, LIMIT),
    keepPreviousData: true
  })

  const deleteStudentMutation = useMutation({
    mutationFn: (id: number | string) => deleteStudent(id),
    onSuccess: (_, id) => {
      toast.success(`Xóa thành công student với id là ${id}`)
      queryClient.invalidateQueries({ queryKey: ['students'], exact: true })
    }
  })

  const handleDelete = (id: number) => {
    deleteStudentMutation.mutate(id)
  }

  const handlePrefetchStudent = (id: number) => {
    
  }

  const totalStudentsCount = Number(studentQuery.data?.headers['x-total-count'] || 0)
  const totalPage = Math.ceil(totalStudentsCount / LIMIT)

  return (
    <>
      <div>
        <h1 className='text-lg'>Students</h1>
        <Link
          to='/students/add'
          type='button'
          className='mr-2 mb-2 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800'
        >
          Add Student
        </Link>
        {studentQuery.isLoading && (
          <div role='status' className='mt-6 animate-pulse'>
            <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
            <span className='sr-only'>Loading...</span>
          </div>
        )}
        {!studentQuery.isLoading && studentQuery.data && (
          <Fragment>
            <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='py-3 px-6'>
                      #
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Avatar
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Name
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Email
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      <span className='sr-only'>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentQuery.data?.data.map((student: any, index: number) => (
                    <tr
                      key={student.id}
                      className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                    >
                      <td className='py-4 px-6'>{index + 1}</td>
                      <td className='py-4 px-6'>
                        <img src={student.avatar} alt='student' className='h-5 w-5' />
                      </td>
                      <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
                        {student.last_name}
                      </th>
                      <td className='py-4 px-6'>{student.email}</td>
                      <td className='py-4 px-6 text-right'>
                        <Link
                          to={`/students/${student.id}`}
                          className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                        >
                          Edit
                        </Link>
                        <button
                          className='font-medium text-red-600 dark:text-red-500'
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='mt-6 flex justify-center'>
              <nav aria-label='Page navigation example'>
                <ul className='inline-flex -space-x-px'>
                  <li>
                    {page === 1 ? (
                      <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        Previous
                      </span>
                    ) : (
                      <Link
                        to={`/students?page=${page - 1}`}
                        className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      >
                        Previous
                      </Link>
                    )}
                  </li>
                  {Array(totalPage)
                    .fill(0)
                    .map((_, index) => {
                      const pageNumber = index + 1
                      const isActive = page === pageNumber
                      return (
                        <li key={pageNumber}>
                          <Link
                            className={classNames(
                              'leading-tigh border border-gray-300 py-2 px-3 hover:bg-gray-100 hover:text-gray-700',
                              {
                                'bg-gray-100 text-gray-700': isActive,
                                'bg-white text-gray-500': !isActive
                              }
                            )}
                            to={`/students?page=${pageNumber}`}
                          >
                            {pageNumber}
                          </Link>
                        </li>
                      )
                    })}

                  <li>
                    {page === totalPage ? (
                      <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        Next
                      </span>
                    ) : (
                      <Link
                        className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        to={`/students?page=${page + 1}`}
                      >
                        Next
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </Fragment>
        )}
      </div>
    </>
  )
}
