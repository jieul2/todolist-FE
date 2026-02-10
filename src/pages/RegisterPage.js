import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const navigate = useNavigate();

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
      }
      const response = await api.post("/user", {
        name,
        email,
        password,
        color,
      });
      if (response.status === 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      setError(err.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="display-center">
      <div className="login-container">
        <header className="login-header">
          <h1>회원가입</h1>
        </header>

        {error && <div className="red-error">{error}</div>}

        <Form className="login-box" onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>이름</Form.Label>
            <Form.Control
              className="input-box"
              type="text"
              placeholder="이름"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>

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

          {/* 배경색 선택 섹션 */}
          <Form.Group className="mb-3" controlId="formBasicColor">
            <Form.Label>배경색 선택</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Form.Control
                type="color"
                className="input-color-picker"
                onChange={(event) => setColor(event.target.value)}
                title="배경색을 선택하세요"
                value={color}
              />
              <span className="text-muted small">
                로그인 후 이 색상이 배경으로 적용됩니다.
              </span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              className="input-box"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicSecPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              className="input-box"
              type="password"
              placeholder="Re-enter password"
              onChange={(event) => setSecPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Button className="button-add w-100" type="submit">
            가입하기
          </Button>

          <div className="login-footer">
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              이미 계정이 있나요?{" "}
              <strong className="link-text">로그인하러 가기</strong>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
