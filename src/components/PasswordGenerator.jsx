import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let allowedChars = '';
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (allowedChars.length === 0) {
      alert('Selecciona al menos un tipo de carácter.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      newPassword += allowedChars[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password);
      alert('Contraseña copiada al portapapeles.');
    }
  };

  return (
    <div className="password-generator-container">
      <h1>Generador de Contraseñas</h1>
      <div className="password-display">
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Tu contraseña aparecerá aquí"
        />
        <button onClick={copyToClipboard} disabled={password.length === 0}>
          Copiar
        </button>
      </div>
      <div className="password-options">
        <div className="slider-container">
          <label>Longitud: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="option">
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label htmlFor="uppercase">Incluir Mayúsculas</label>
        </div>
        <div className="option">
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <label htmlFor="lowercase">Incluir Minúsculas</label>
        </div>
        <div className="option">
          <input
            type="checkbox"
            id="numbers"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label htmlFor="numbers">Incluir Números</label>
        </div>
        <div className="option">
          <input
            type="checkbox"
            id="symbols"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label htmlFor="symbols">Incluir Símbolos</label>
        </div>
      </div>
      <button className="generate-button" onClick={generatePassword}>
        Generar Contraseña
      </button>
    </div>
  );
};

export default PasswordGenerator;
