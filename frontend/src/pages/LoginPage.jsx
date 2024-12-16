import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import connection from "../api/ApiConnection";
import { AuthService } from "../services/AuthService";

const LoginPage = () => {
  const loginService = new AuthService();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const toast = React.useRef(null);
  const [loadingButton, setLoadingButton] = useState("Login");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Error handler for Axios response errors
  connection.setErrorHandler((error) => {
    if (toast.current) {
      toast.current.show(error);
    }
  });

  // Validate before submitting
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Email and Password are required.",
        life: 3000,
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingButton("Please wait...");

    // Validate the form first
    if (!validateForm()) {
      setLoadingButton("Login");
      return;
    }

    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Get CSRF token before sending login request
      await connection.get("/sanctum/csrf-cookie");

      const response = await loginService.getLogin(data);
      setLoadingButton("Please wait...");

      if (response.success) {
        toast.current.show({
          severity: "success",
          summary: response.message,
          life: 3000,
        });

        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          window.location.replace("/persons");
        }, 1000);
      } else {
        setLoadingButton("Login");
        toast.current.show({
          severity: "error",
          summary: response.message,
          life: 3000,
        });
      }
    } catch (error) {
      setLoadingButton("Login");
    }
  };

  const isFormFieldValid = (field) => !!(submitted && !formData[field]);

  const getFormErrorMessage = (field) => {
    return (
      isFormFieldValid(field) && (
        <small className="p-error">The {field} field is required.</small>
      )
    );
  };

  return (
    <div className="login-wrapper">
      <Toast ref={toast} />
      <div className="login-container">
        <Card title="Login" className="login-card">
          <form onSubmit={handleLogin} className="p-fluid">
            <div className="field">
              <label
                htmlFor="email"
                className={classNames({ "p-error": isFormFieldValid("email") })}
              >
                Email
              </label>
              <InputText
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("email"),
                })}
              />
              {getFormErrorMessage("email")}
            </div>

            <div className="field">
              <label
                htmlFor="password"
                className={classNames({
                  "p-error": isFormFieldValid("password"),
                })}
              >
                Password
              </label>
              <Password
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                toggleMask
                feedback={false}
                className={classNames({
                  "p-invalid": isFormFieldValid("password"),
                })}
              />
              {getFormErrorMessage("password")}
            </div>

            <Button
              type="submit"
              label={loadingButton}
              icon="pi pi-sign-in"
              className="mt-4"
              severity="secondary"
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
