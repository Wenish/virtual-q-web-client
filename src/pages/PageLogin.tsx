import { Link } from 'react-router-dom'

const PageLogin = () => {
  return (
    <div className="grid gap-4">
      <h1 className="text-center text-2xl font-bold md:text-4xl">Login</h1>
      <div className="mx-auto grid w-full max-w-xl gap-2 md:gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            className="input input-bordered input-primary w-full"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="input input-bordered input-primary w-full"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <div className="grid justify-center">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="grid justify-center">
          <Link to="/register" className="link link-accent">
            I don't have an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
