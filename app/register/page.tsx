"use client";

import { userRegisterServer } from "@/server/userServer"
import { useFormState } from "react-dom";

function Register() {

  const [state, formAction] = useFormState(userRegisterServer, {
    errorMessage: ""
  });

  return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Register</h2>
                {state.errorMessage && 
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {state.errorMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                }
                <form action={formAction} method="POST">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register