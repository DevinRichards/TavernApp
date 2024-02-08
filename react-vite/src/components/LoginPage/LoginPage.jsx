import React from 'react';
import LoginFormModal from '../LoginFormModal';
import LoginFormPage from '../LoginFormPage';

function LoginPage() {
  const greyBoxStyle = {
    background: 'rgb(49,51,56)',
    padding: '8px',
    borderRadius: '8px',
  };

  return (
    <nav>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://preview.redd.it/t7b5j2cqpce21.png?width=960&crop=smart&auto=webp&s=0e14d971551fd0d0b4e7cf3a512ca06d714e91e8')" }}>
        <div className="flex items-center justify-center h-full">
          <div style={greyBoxStyle}>
            <LoginFormPage />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LoginPage;
