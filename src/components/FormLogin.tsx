import { SubmitHandler, useForm } from 'react-hook-form'

const FormLogin: React.FC<{
  onSubmit?: SubmitHandler<FormLoginData>
  disabled?: boolean
  isLoading?: boolean
}> = ({ onSubmit, disabled, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginData>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onFormSubmit: SubmitHandler<FormLoginData> = (data) => {
    if (onSubmit) {
      return onSubmit(data)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="mx-auto grid w-full max-w-xl gap-2 md:gap-4"
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Username</span>
        </div>
        <input
          {...register('username', { required: 'Please enter your username' })}
          disabled={disabled}
          type="text"
          className="input input-bordered input-primary w-full"
        />
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.username && errors.username.message}
          </span>
        </div>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          {...register('password', { required: 'Please enter your password' })}
          disabled={disabled}
          type="password"
          className="input input-bordered input-primary w-full"
        />
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.password && errors.password.message}
          </span>
        </div>
      </label>
      <div className="grid justify-center">
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          {isLoading && <span className="loading loading-spinner"></span>}
          Login
        </button>
      </div>
    </form>
  )
}

export default FormLogin

export type FormLoginData = {
  username: string
  password: string
}
