import { Link } from "react-router-dom"

const PageLogin = () => {
    return (
        <div className="grid gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-center">Login</h1>
            <div className="grid gap-2 md:gap-4 w-full max-w-xl mx-auto">
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
                <div className="grid justify-center">
                    <button className="btn btn-primary">Login</button>
                </div>
                <div className="grid justify-center">
                    <Link to="/register" className="link link-accent">I don't have an account</Link>
                </div>
            </div>
        </div>
    )
}

export default PageLogin
