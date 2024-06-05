import { SubmitHandler, useForm } from 'react-hook-form'

const FormQueue: React.FC<{
  onSubmit?: SubmitHandler<FormQueueData>
  disabled?: boolean
  isLoading?: boolean
  defaultValues?: FormQueueData
  buttonLabel?: string
}> = ({
  onSubmit,
  disabled,
  isLoading,
  defaultValues,
  buttonLabel = 'Save',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormQueueData>({
    defaultValues,
  })

  const nameMaxLength = 255

  const onFormSubmit: SubmitHandler<FormQueueData> = (data) => {
    if (onSubmit) {
      return onSubmit(data)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="mx-auto grid w-full">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Name</span>
        </div>
        <input
          {...register('name', {
            required: 'Please enter a queue name',
            maxLength: {
              value: nameMaxLength,
              message: `Name must be ${nameMaxLength} characters or fewer`,
            },
          })}
          disabled={disabled}
          type="text"
          className="input input-bordered input-primary w-full"
        />
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.name && errors.name.message}
          </span>
        </div>
      </label>
      <div className="grid justify-start">
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          {isLoading && <span className="loading loading-spinner"></span>}
          {buttonLabel}
        </button>
      </div>
    </form>
  )
}

export default FormQueue

export type FormQueueData = {
  name: string
}
