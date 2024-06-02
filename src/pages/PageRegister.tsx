import { Link } from "react-router-dom"

const PageRegister = () => {
    return (
        <div className="grid gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center">Register</h1>
            <div className="grid gap-2 md:gap-4 w-full max-w-xl mx-auto">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" className="input input-bordered input-primary w-full" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type="text" className="input input-bordered input-primary w-full" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" className="input input-bordered input-primary w-full" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Confirm password</span>
                    </div>
                    <input type="password" className="input input-bordered input-primary w-full" />
                    <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                    </div>
                </label>
                <div className="grid justify-center">
                    <button className="btn btn-primary">Register</button>
                </div>
                <div className="grid justify-center">
                    <Link to="/login" className="link link-accent">I already have an account</Link>
                </div>
            </div>
        </div>
    )
}

export default PageRegister
