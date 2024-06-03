import { SubmitHandler, useForm } from "react-hook-form"

const FormLogin: React.FC<{ onSubmit?: SubmitHandler<LoginFormData>}> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onFormSubmit: SubmitHandler<LoginFormData> = (data) => {
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
                    {...register('username', { required: true })}
                    type="text"
                    className="input input-bordered input-primary w-full"
                />
                <div className="label">
                    <span className="label-text-alt text-error">{ errors.username && 'Please enter your username'}</span>
                </div>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input
                    {...register('password', { required: true})}
                    type="password"
                    className="input input-bordered input-primary w-full"
                />
                <div className="label">
                    <span className="label-text-alt text-error">{ errors.password && 'Please enter your password'}</span>
                </div>
            </label>
            <div className="grid justify-center">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>
        </form>
    )
}

export default FormLogin

export type LoginFormData = {
    username: string
    password: string
}