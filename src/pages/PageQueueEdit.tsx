import { useMutation, useQuery } from '@tanstack/react-query'
import FormQueue, { FormQueueData } from '../components/FormQueue'
import { useAuth } from '../hooks/useAuth'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { virtualqApi } from '../api/virtualq.api'

const PageQueueEdit = () => {
  const { queueId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.queues.id
        .get(Number(queueId), token)
        .then((res) => res.data)
    },
  })

  const mutation = useMutation({
    mutationFn: (name: string) => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.queues.id.patch(Number(queueId), { name }, token)
    },
    onSuccess: () => {
      navigate(`/queues/${queueId}/edit/success`)
    },
  })

  const onSubmit: SubmitHandler<FormQueueData> = (formQueueData) => {
    mutation.mutate(formQueueData.name)
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
