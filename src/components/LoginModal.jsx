import { useState } from "react";

function LoginModal({ open, onClose, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || loading) return;

    setLoading(true);
    window.setTimeout(() => {
      onLogin({ name: name.trim(), email: email.trim() });
      setName("");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  if (!open) return null;

  return (
    <div
      className="login-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <button
        className="login-backdrop"
        onClick={onClose}
        aria-label="Close login"
      />
      <div className="login-card">
        <button
          className="login-close"
          onClick={onClose}
          aria-label="Close login"
        >
          ×
        </button>
        <div className="login-character" aria-hidden="true">
          🐰
        </div>
        <span>Welcome to the little shop</span>
        <h2 id="login-title">Come on in ✿</h2>
        <p>
          This is a pretend local login. No password or information is sent
          anywhere.
        </p>
        <form onSubmit={submit}>
          <label>
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Daisy"
              required
              autoFocus
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="daisy@example.com"
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"} <span>♡</span>
          </button>
        </form>
        <small>
          Just for the layout—your login resets when the page refreshes.
        </small>
      </div>
    </div>
  );
}

export default LoginModal;
