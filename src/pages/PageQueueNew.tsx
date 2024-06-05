import { useMutation } from '@tanstack/react-query'
import FormQueue, { FormQueueData } from '../components/FormQueue'
import axios, { AxiosResponse } from 'axios'
import { useAuth } from '../hooks/useAuth'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const PageQueueNew = () => {
  const { token, decodedToken } = useAuth()
  const navigate = useNavigate()

  const endpointQueues = `${import.meta.env.VITE_HOST_API}/queues/`
  const mutation = useMutation({
    mutationFn: (formData: QueuePostBody) => {
      return axios.post<
        QueuePostResponse,
        AxiosResponse<QueuePostResponse, QueuePostBody>,
        QueuePostBody
      >(endpointQueues, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      navigate('/queues-new/success')
    },
  })

  const onSubmit: SubmitHandler<FormQueueData> = (formQueueData) => {
    const userId = decodedToken()?.user_id

    if (!userId) throw 'No user id'

    const formData: QueuePostBody = {
      ...formQueueData,
      user: userId,
    }
    mutation.mutate(formData)
  }
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <h1 className="text-2xl font-bold md:text-4xl">New queue</h1>
      <FormQueue
        onSubmit={onSubmit}
        buttonLabel="Create Queue"
        disabled={mutation.isPending}
        isLoading={mutation.isPending}
      />
    </div>
  )
}

export default PageQueueNew

type QueuePostResponse = {
  name: string
}

type QueuePostBody = {
  name: string
  user: number
}
