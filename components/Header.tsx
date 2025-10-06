
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Consultor de Implementación MCP
        </h1>
        <p className="mt-2 text-md text-gray-400 max-w-2xl mx-auto">
          Un asistente de IA para diseñar flujos de valor seguros y escalables utilizando el Protocolo de Contexto de Modelo.
        </p>
      </div>
    </header>
  );
};

export default Header;
