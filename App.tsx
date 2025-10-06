
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { generateMcpPlan } from './services/geminiService';
import LoadingSpinner from './components/icons/LoadingSpinner';

const App: React.FC = () => {
  const [need, setNeed] = useState<string>('Necesito un agente que, al recibir un correo con el asunto "Nuevo Lead", consulte mi base de datos de clientes (API REST) para verificar si el cliente ya existe. Si no existe, debe crearlo y luego enviar un resumen del nuevo lead a un canal específico de Slack.');
  const [tools, setTools] = useState<string>('API REST de CRM (endpoints para GET y POST de clientes), Slack API (para enviar mensajes), Servidor de Correo (IMAP para leer correos).');
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!need || !tools) {
      setError('Por favor, complete ambos campos de entrada.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput('');

    try {
      const result = await generateMcpPlan(need, tools);
      setOutput(result);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al generar el plan. Por favor, revise la consola y asegúrese de que su clave de API sea válida.');
    } finally {
      setIsLoading(false);
    }
  }, [need, tools]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputForm
            need={need}
            setNeed={setNeed}
            tools={tools}
            setTools={setTools}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col min-h-[calc(100vh-200px)]">
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">Plan de Implementación Generado</h2>
            {isLoading && (
              <div className="flex flex-col items-center justify-center flex-grow">
                <LoadingSpinner />
                <p className="mt-4 text-lg text-gray-400">Analizando y generando arquitectura...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
            {output && !isLoading && <OutputDisplay content={output} />}
            {!output && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center flex-grow text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Su plan de implementación aparecerá aquí.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
