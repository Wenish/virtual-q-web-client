import { useMutation } from '@tanstack/react-query'
import FormQueue, { FormQueueData } from '../components/FormQueue'
import { useAuth } from '../hooks/useAuth'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { QueuePostBody, virtualqApi } from '../api/virtualq.api'

const PageQueueNew = () => {
  const { token, decodedToken } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (formData: QueuePostBody) => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.queues.post(formData, token)
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
