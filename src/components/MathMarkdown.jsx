import React from 'react';
import ReactMarkdown from 'react-markdown';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const MathMarkdown = ({ content }) => {
  if (!content) return null;

  const tokens = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$.*?\$)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: 'markdown',
        content: content.substring(lastIndex, match.index)
      });
    }
    const matchText = match[0];
    if (matchText.startsWith('$$')) {
      tokens.push({
        type: 'block-math',
        content: matchText.slice(2, -2).trim()
      });
    } else {
      tokens.push({
        type: 'inline-math',
        content: matchText.slice(1, -1).trim()
      });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    tokens.push({
      type: 'markdown',
      content: content.substring(lastIndex)
    });
  }

  return (
    <div className="math-markdown leading-relaxed text-slate-800">
      {tokens.map((token, idx) => {
        if (token.type === 'block-math') {
          try {
            const html = katex.renderToString(token.content, { displayMode: true, throwOnError: false });
            return (
              <div 
                key={idx} 
                className="my-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl overflow-x-auto text-center shadow-sm select-all scrollbar-thin animate-in fade-in duration-300" 
                dangerouslySetInnerHTML={{ __html: html }} 
              />
            );
          } catch (e) {
            return (
              <pre key={idx} className="my-6 p-4 bg-red-50 text-red-600 rounded-2xl overflow-x-auto">
                {token.content}
              </pre>
            );
          }
        } else if (token.type === 'inline-math') {
          try {
            const html = katex.renderToString(token.content, { displayMode: false, throwOnError: false });
            return (
              <span 
                key={idx} 
                className="mx-1 px-1 bg-slate-50 border border-slate-100 rounded font-mono select-all inline-block align-middle" 
                dangerouslySetInnerHTML={{ __html: html }} 
              />
            );
          } catch (e) {
            return <code key={idx} className="mx-1 px-1 bg-red-50 text-red-600 rounded">{token.content}</code>;
          }
        } else {
          return (
            <ReactMarkdown 
              key={idx} 
              components={{
                p: ({ children }) => <span className="block mb-4 text-slate-700 font-sans leading-relaxed text-[16px] md:text-[17px]">{children}</span>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-slate-700">{children}</ol>,
                li: ({ children }) => <li className="pl-1">{children}</li>,
                h1: ({ children }) => <h1 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold text-slate-900 mt-5 mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold text-indigo-900 mt-4 mb-2">{children}</h3>,
                strong: ({ children }) => <strong className="font-semibold text-indigo-700">{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 italic my-4 bg-indigo-50/50 rounded-r-xl text-slate-600">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {token.content.replace(/\n/g, '  \n')}
            </ReactMarkdown>
          );
        }
      })}
    </div>
  );
};

export default MathMarkdown;
