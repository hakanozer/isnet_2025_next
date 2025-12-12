"use client";

import { userLoginServer } from "@/server/userServer"
import Link from "next/link";
import { useActionState } from "react";

function Login() {

  const [state, formAction] = useActionState(userLoginServer, {
      errorMessage: ""
  });

  return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Login</h2>
                {state.errorMessage && 
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> {state.errorMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                }
                <form action={formAction}>
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
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link href={'register'} className="btn btn-warning">Register</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login