import React from "react";
import BasePage from "./BasePage";
import axios from "axios";

class Register extends BasePage {
  state = {
    username: "",
    password: "",
    email: "",
    role: "customer",
    loading: false,
    error: null,
    success: null,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null, success: null });
    try {
      const res = await axios.post("/api/users/register", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        role: this.state.role,
      });
      this.setState({
        success: res.data.message,
        loading: false,
        username: "",
        password: "",
        email: "",
        role: "",
      });
    } catch (err) {
      this.setState({
        error: err.response?.data?.error || "Gagal register",
        loading: false,
      });
    }
  };

  render() {
    const { username, password, email, role, loading, error, success } =
      this.state;
    return this.renderContainer(
      <section className="section">
        <div className="box" style={{ maxWidth: 420, margin: "0 auto" }}>
          <h2 className="title has-text-centered has-text-link-dark mb-5">
            Register
          </h2>
          {error && (
            <div className="notification is-danger is-light is-size-7 mb-3">
              {error}
            </div>
          )}
          {success && (
            <div className="notification is-success is-light is-size-7 mb-3">
              {success}
            </div>
          )}
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <div className="field mb-4">
              <label
                className="label has-text-weight-semibold"
                style={{ color: "var(--primary)" }}
              >
                Username
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  placeholder="Username"
                  required
                  style={{ color: "var(--primary)" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field mb-4">
              <label
                className="label has-text-weight-semibold"
                style={{ color: "var(--primary)" }}
              >
                Password
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  required
                  style={{ color: "var(--primary)" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field mb-4">
              <label
                className="label has-text-weight-semibold"
                style={{ color: "var(--primary)" }}
              >
                Email
              </label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Email"
                  required
                  style={{ color: "var(--primary)" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field mb-5">
              <label
                className="label has-text-weight-semibold"
                style={{ color: "var(--primary)" }}
              >
                Role
              </label>
              <div className="control">
                <label className="radio" style={{ color: "var(--primary)" }}>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === "customer"}
                    onChange={this.handleChange}
                  />
                  &nbsp;Customer
                </label>
                <label
                  className="radio"
                  style={{ marginLeft: 16, color: "var(--primary)" }}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={this.handleChange}
                  />
                  &nbsp;Admin
                </label>
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered mt-5">
              <div className="control">
                <button
                  className={`button is-link is-fullwidth${
                    loading ? " is-loading" : ""
                  }`}
                  disabled={loading}
                  style={{ minWidth: 120 }}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;
