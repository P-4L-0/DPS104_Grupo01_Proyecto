"use client"
import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from '../AdminLogin.module.css';

interface Props {
  onLogin: (username: string, password: string) => boolean;
  onCancel: () => void;
}

export default function AdminLogin({ onLogin, onCancel }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!onLogin(username.trim(), password)) {
      setError('Usuario o contraseña incorrectos.');
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={styles.lockIcon}
            >
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" strokeLinecap="round" />
            </svg>
          </div>
          <p className={styles.eyebrow}>Acceso restringido</p>
          <h1 className={styles.title}>Panel administrativo</h1>
          <p className={styles.subtitle}>
            Ingresá tus credenciales para gestionar los reportes ciudadanos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.fieldGroup}>
            <span className={styles.label}>Usuario</span>
            <input
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              autoComplete="username"
              autoFocus
              required
              placeholder="Ingresá tu usuario"
              className={styles.input}
            />
          </label>

          <label className={styles.fieldGroup}>
            <span className={styles.label}>Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              placeholder="Ingresá tu contraseña"
              className={styles.input}
            />
          </label>

          {error && (
            <div role="alert" className={styles.errorBox}>
              {error}
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            Ingresar al panel
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelBtn}
          >
            Volver al inicio
          </button>
        </form>
      </div>
    </main>
  );
}
