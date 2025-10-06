
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface InputFormProps {
  need: string;
  setNeed: (value: string) => void;
  tools: string;
  setTools: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ need, setNeed, tools, setTools, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
      <div>
        <label htmlFor="need" className="block text-lg font-semibold mb-2 text-indigo-300">
          1. Necesidad / Caso de Uso
        </label>
        <textarea
          id="need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          placeholder='Ej: "Necesito un agente que, al recibir un correo, consulte mi base de datos de clientes (API REST) y envíe un resumen personalizado a Slack."'
          rows={6}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-200 placeholder-gray-500"
        />
      </div>
      <div>
        <label htmlFor="tools" className="block text-lg font-semibold mb-2 text-indigo-300">
          2. Herramientas / Sistemas Existentes
        </label>
        <textarea
          id="tools"
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          placeholder='Ej: "API REST de CRM, Google Sheets, Slack API, Sistema de log de errores (JSON files)."'
          rows={4}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-200 placeholder-gray-500"
        />
      </div>
      <div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? (
            'Generando...'
          ) : (
            <>
              <SparklesIcon />
              Generar Plan de Implementación
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
