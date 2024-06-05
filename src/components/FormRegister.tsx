import { SubmitHandler, useForm } from 'react-hook-form'

const FormRegister: React.FC<{
  onSubmit?: SubmitHandler<FormRegisterData>
  disabled?: boolean
  isLoading?: boolean
}> = ({ onSubmit, disabled, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormRegisterData>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      password2: '',
    },
  })

  const password = watch('password')

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const usernameLength = 30
  const usernameRegex = /^[a-zA-Z0-9]+$/

  const passwordMinLength = 8
  const passwordRegexLowercaseLetter = /[a-z]/
  const passwordRegexUppercaseLetter = /[A-Z]/
  const passwordRegexDigit = /\d/
  const passwordRegexSpecialCharacter = /[!@#$%^&*(),.?":{}|<>-]/

  const validatePassword = (value: string) => {
    const errors = []
    if (value.length < passwordMinLength) {
      errors.push(
        `Password must be at least ${passwordMinLength} characters long`
      )
    }
    if (!passwordRegexLowercaseLetter.test(value)) {
      errors.push('Password must include at least one lowercase letter')
    }
    if (!passwordRegexUppercaseLetter.test(value)) {
      errors.push('Password must include at least one uppercase letter')
    }
    if (!passwordRegexDigit.test(value)) {
      errors.push('Password must include at least one digit')
    }
    if (!passwordRegexSpecialCharacter.test(value)) {
      errors.push(
        'Password must include at least one special character (!@#$%^&*(),.?":{}|<>-)'
      )
    }
    return errors.length > 0 ? errors.join('. ') : true
  }

  const onFormSubmit: SubmitHandler<FormRegisterData> = (data) => {
    if (onSubmit) {
      return onSubmit(data)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="mx-auto grid w-full max-w-xl"
      autoComplete="off"
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          {...register('email', {
            required: 'Please enter your email',
            pattern: {
              value: emailRegex,
              message: 'Enter a valid email address',
            },
          })}
          disabled={disabled}
          type="text"
          className="input input-bordered input-primary w-full"
        />
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.email && errors.email.message}
          </span>
        </div>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Username</span>
        </div>
        <input
          {...register('username', {
            required: 'Please a your username',
            maxLength: {
              value: usernameLength,
              message: `Username must be ${usernameLength} characters or fewer`,
            },
            pattern: {
              value: usernameRegex,
              message: 'Username can only contain letters a-z and digits 0-9',
            },
          })}
          disabled={disabled}
          type="text"
          className="input input-bordered input-primary w-full"
          autoComplete="off"
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
          {...register('password', {
            required: 'Please enter a password',
            validate: validatePassword,
          })}
          disabled={disabled}
          type="password"
          className="input input-bordered input-primary w-full"
          autoComplete="new-password"
          autoCorrect="off"
        />
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.password && errors.password.message}
          </span>
        </div>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Repeat Password</span>
        </div>
        <input
          {...register('password2', {
            required: 'Repeat your password',
            validate: (value) =>
              value === password || 'The passwords do not match',
          })}
          disabled={disabled}
          type="password"
          className="input input-bordered input-primary w-full"
          autoComplete="off"
        />
        <div className="label">
          <span className="label-text-alt text-error">
            {errors.password2 && errors.password2.message}
          </span>
        </div>
      </label>
      <div className="grid justify-center">
        <button type="submit" className="btn btn-primary" disabled={disabled}>
          {isLoading && <span className="loading loading-spinner"></span>}
          Register
        </button>
      </div>
    </form>
  )
}

export default FormRegister

export type FormRegisterData = {
  email: string
  username: string
  password: string
  password2: string
}
