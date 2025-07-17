import { useState } from "react";

import useRequest from "../../hooks/use-request";
import Router from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "http://localhost:3001/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Sign IN</h1>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        {errors.map((error) => (
          <div key={error.message} className="alert alert-danger">
            {error.message}
          </div>
        ))}
        <button className="btn btn-primary">Signin</button>
      </form>
    </>
  );
}
