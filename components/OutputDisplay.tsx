
import React, { useCallback } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';

interface OutputDisplayProps {
  content: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content }) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

  const renderContent = () => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.match(/^#+\s/)) { // Markdown headers
        const level = trimmedLine.match(/^#+/)![0].length;
        const text = trimmedLine.replace(/^#+\s/, '');
        if (level === 1) return <h1 key={index} className="text-3xl font-bold mt-6 mb-3 text-indigo-300">{text}</h1>;
        if (level === 2) return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-indigo-400">{text}</h2>;
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-gray-200">{text}</h3>;
      }
      
      if (trimmedLine.match(/^\d\.\s/)) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-indigo-400 border-b-2 border-indigo-500/30 pb-2">{line}</h2>;
      }
      if (trimmedLine.match(/^\d\.\d\./)) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-gray-200">{line}</h3>;
      }
      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc text-gray-300 leading-relaxed">{line.substring(2)}</li>;
      }
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        return <p key={index} className="text-gray-300 leading-relaxed font-bold">{trimmedLine.slice(2,-2)}</p>
      }
      if (trimmedLine.startsWith('`') && trimmedLine.endsWith('`')) {
          return <code key={index} className="bg-gray-900 text-purple-300 px-2 py-1 rounded-md text-sm">{trimmedLine.slice(1,-1)}</code>
      }
      if (trimmedLine.startsWith('Dado') || trimmedLine.startsWith('Cuando') || trimmedLine.startsWith('Entonces') || trimmedLine.startsWith('Y')) {
        return <p key={index} className="ml-4 text-gray-300 leading-relaxed"><span className="font-semibold text-indigo-300">{trimmedLine.split(' ')[0]}</span> {trimmedLine.substring(trimmedLine.split(' ')[0].length)}</p>
      }
      if (trimmedLine === '') {
        return <br key={index} />;
      }

      return <p key={index} className="text-gray-300 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="relative h-full">
        <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-2 text-gray-400 bg-gray-700 rounded-lg hover:bg-gray-600 hover:text-white transition"
            title="Copiar al portapapeles"
        >
            <ClipboardIcon />
        </button>
        <div className="prose prose-invert max-w-none h-full overflow-y-auto pr-4">
            {renderContent()}
        </div>
    </div>
  );
};

export default OutputDisplay;
