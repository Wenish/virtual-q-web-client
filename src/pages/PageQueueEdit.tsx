import { useMutation, useQuery } from '@tanstack/react-query'
import FormQueue, { FormQueueData } from '../components/FormQueue'
import axios, { AxiosResponse } from 'axios'
import { useAuth } from '../hooks/useAuth'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const PageQueueEdit = () => {
  const { queueId } = useParams()
  const { token, decodedToken } = useAuth()
  const navigate = useNavigate()

  const endpointQueue = `${import.meta.env.VITE_HOST_API}/queues/${queueId}/`

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () =>
      axios
        .get<QueueGetResponse>(endpointQueue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  })

  const mutation = useMutation({
    mutationFn: (formData: QueuePutBody) => {
      return axios.put<
        QueuePutResponse,
        AxiosResponse<QueuePutResponse, QueuePutBody>,
        QueuePutBody
      >(endpointQueue, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      navigate(`/queues/${queueId}/edit/success`)
    },
  })

  const onSubmit: SubmitHandler<FormQueueData> = (formQueueData) => {
    const userId = decodedToken()?.user_id

    if (!userId) throw 'No user id'

    const formData: QueuePutBody = {
      ...formQueueData,
      user: userId,
    }
    mutation.mutate(formData)
  }

  if (isPending || isFetching) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <h1 className="break-all text-2xl font-bold md:text-4xl">
        Edit queue: {data.name}
      </h1>
      <FormQueue
        onSubmit={onSubmit}
        buttonLabel="Save queue changes"
        disabled={mutation.isPending}
        isLoading={mutation.isPending}
        defaultValues={{
          name: data.name,
        }}
      />
    </div>
  )
}

export default PageQueueEdit

type QueuePutResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
  user: number
}

type QueuePutBody = {
  name: string
  user: number
}

type QueueGetResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
  user: number
}
