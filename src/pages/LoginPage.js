import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate, Navigate } from "react-router-dom";

const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handelLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("user/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        navigate("/");
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      // 서버에서 오는 에러 메시지 처리
      setError(err.error || "로그인에 실패했습니다.");
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="display-center">
      <div className="login-container">
        <header className="login-header">
          <h1>로그인</h1>
        </header>

        {error && <div className="red-error">{error}</div>}

        <Form className="login-box" onSubmit={handelLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control
              className="input-box"
              type="email"
              placeholder="email@example.com"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              className="input-box"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="button-add w-100 mb-3">
            로그인하기
          </Button>

          <div className="login-footer">
            <span>계정이 없으신가요?</span>
            <Link to="/register" className="link-text">
              회원가입 하기
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
