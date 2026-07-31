import React, { useState, useEffect, useRef } from 'react';
import { X, Calculator, ChartLine, PenTool, Image, HelpCircle, Loader2, Play, ZoomIn, ZoomOut, RotateCcw, Copy, Check, Upload, Sparkles } from 'lucide-react';
import { apiClient } from '../utils/api';
import katex from 'katex';

export const EducationalTools = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('calculator'); // calculator, graphing, equation

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="h-20 border-b border-slate-100 px-6 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Educational Tools
          </h2>
          <p className="text-xs text-slate-500">STEM Helper Panel</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 shrink-0 bg-slate-50/30">
        {[
          { id: 'calculator', label: 'Calculator', icon: Calculator },
          { id: 'graphing', label: 'Graphing', icon: ChartLine },
          { id: 'equation', label: 'Formula Editor', icon: PenTool },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex flex-col items-center gap-1.5 text-xs font-bold transition-all border-b-2 ${
                isActive 
                  ? 'border-indigo-600 text-indigo-600 bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/10">
        {activeTab === 'calculator' && <ScientificCalculator />}
        {activeTab === 'graphing' && <GraphPlotter />}
        {activeTab === 'equation' && <EquationEditor />}
      </div>
    </div>
  );
};

/* --- 1. SCIENTIFIC CALCULATOR --- */
const ScientificCalculator = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState('');

  const btnClass = "py-3 rounded-xl text-sm font-bold transition-all border";
  const numClass = `${btnClass} bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300`;
  const opClass = `${btnClass} bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100`;
  const fnClass = `${btnClass} bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 text-xs font-mono`;
  const actClass = `${btnClass} bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 col-span-2 shadow-lg shadow-indigo-100`;

  const handleInput = (val) => {
    setDisplay((prev) => prev + val);
  };

  const handleClear = () => {
    setDisplay('');
    setHistory('');
  };

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    if (!display) return;
    let equation = display;
    
    // Replace human friendly inputs with JS Math operations
    let parsedEq = equation
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**');

    // Balance brackets if user forgot
    const openBrackets = (parsedEq.match(/\(/g) || []).length;
    const closeBrackets = (parsedEq.match(/\)/g) || []).length;
    if (openBrackets > closeBrackets) {
      parsedEq += ')'.repeat(openBrackets - closeBrackets);
    }

    try {
      const result = new Function(`return ${parsedEq}`)();
      if (Number.isFinite(result)) {
        setHistory(display + ' =');
        setDisplay(Number(result.toFixed(8)).toString());
      } else {
        setDisplay('Error');
      }
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm max-w-sm mx-auto">
      {/* Display */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-right mb-4 min-h-[80px] flex flex-col justify-end">
        <div className="text-xs text-slate-400 font-medium truncate mb-1">{history}</div>
        <div className="text-xl font-bold text-slate-800 break-all select-all">{display || '0'}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button onClick={handleClear} className={`${fnClass} text-red-600 bg-red-50 border-red-100 hover:bg-red-100`}>C</button>
        <button onClick={() => handleInput('(')} className={fnClass}>(</button>
        <button onClick={() => handleInput(')')} className={fnClass}>)</button>
        <button onClick={handleDelete} className={fnClass}>Del</button>

        {/* Row 2 */}
        <button onClick={() => handleInput('sin(')} className={fnClass}>sin</button>
        <button onClick={() => handleInput('cos(')} className={fnClass}>cos</button>
        <button onClick={() => handleInput('tan(')} className={fnClass}>tan</button>
        <button onClick={() => handleInput('^')} className={fnClass}>x^y</button>

        {/* Row 3 */}
        <button onClick={() => handleInput('log(')} className={fnClass}>log</button>
        <button onClick={() => handleInput('ln(')} className={fnClass}>ln</button>
        <button onClick={() => handleInput('√(')} className={fnClass}>√</button>
        <button onClick={() => handleInput('/')} className={opClass}>÷</button>

        {/* Row 4 */}
        <button onClick={() => handleInput('7')} className={numClass}>7</button>
        <button onClick={() => handleInput('8')} className={numClass}>8</button>
        <button onClick={() => handleInput('9')} className={numClass}>9</button>
        <button onClick={() => handleInput('*')} className={opClass}>×</button>

        {/* Row 5 */}
        <button onClick={() => handleInput('4')} className={numClass}>4</button>
        <button onClick={() => handleInput('5')} className={numClass}>5</button>
        <button onClick={() => handleInput('6')} className={numClass}>6</button>
        <button onClick={() => handleInput('-')} className={opClass}>-</button>

        {/* Row 6 */}
        <button onClick={() => handleInput('1')} className={numClass}>1</button>
        <button onClick={() => handleInput('2')} className={numClass}>2</button>
        <button onClick={() => handleInput('3')} className={numClass}>3</button>
        <button onClick={() => handleInput('+')} className={opClass}>+</button>

        {/* Row 7 */}
        <button onClick={() => handleInput('0')} className={numClass}>0</button>
        <button onClick={() => handleInput('.')} className={numClass}>.</button>
        <button onClick={() => handleInput('π')} className={fnClass}>π</button>
        <button onClick={() => handleInput('e')} className={fnClass}>e</button>

        <button onClick={handleEqual} className={actClass}>=</button>
      </div>
    </div>
  );
};

/* --- 2. GRAPH PLOTTER --- */
const GraphPlotter = () => {
  const [expression, setExpression] = useState('x^2');
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(40); // Pixels per unit
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragStart, setDragStart] = useState(null);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2 + offsetX;
    const centerY = height / 2 + offsetY;

    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    const startGridX = Math.floor(-centerX / zoom);
    const endGridX = Math.ceil((width - centerX) / zoom);
    for (let x = startGridX; x <= endGridX; x++) {
      const px = centerX + x * zoom;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
      ctx.stroke();

      // Tick Labels
      if (x !== 0 && zoom > 20) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(x.toString(), px, centerY + 15);
      }
    }

    // Horizontal grid lines
    const startGridY = Math.floor(-centerY / zoom);
    const endGridY = Math.ceil((height - centerY) / zoom);
    for (let y = startGridY; y <= endGridY; y++) {
      const py = centerY + y * zoom;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();

      // Tick Labels
      if (y !== 0 && zoom > 20) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((-y).toString(), centerX - 8, py + 3);
      }
    }

    // Draw main axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Draw Origin label
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('0', centerX - 8, centerY + 15);

    // Plot mathematical expression curve
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let started = false;
    for (let px = 0; px < width; px++) {
      // Map screen pixel x to math x coordinate
      const x = (px - centerX) / zoom;
      const y = evaluateFunction(expression, x);

      if (y !== null && Number.isFinite(y)) {
        // Map math y coordinate back to screen pixel y
        const py = centerY - y * zoom;

        // Skip drawing line if it is outside canvas bounds significantly
        if (py >= -100 && py <= height + 100) {
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();
  };

  const evaluateFunction = (fnText, x) => {
    // Safely evaluate simple math formulas
    let processed = fnText
      .toLowerCase()
      .replace(/x/g, `(${x})`)
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E');

    try {
      const result = new Function(`return ${processed}`)();
      return result;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    drawGraph();
  }, [expression, zoom, offsetX, offsetY]);

  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  const handleReset = () => {
    setZoom(40);
    setOffsetX(0);
    setOffsetY(0);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Control Input */}
      <div className="flex gap-2">
        <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2">
          <span className="text-slate-400 font-bold text-sm italic">y =</span>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="flex-1 outline-none text-sm text-slate-800 font-bold font-mono"
            placeholder="e.g. x^2, sin(x), x^3 - 2*x"
          />
        </div>
        <button 
          onClick={handleReset}
          className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl transition-all"
          title="Reset View"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Coordinate Canvas View */}
      <div className="relative border border-slate-200 rounded-3xl overflow-hidden bg-slate-50 shadow-sm cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full object-contain block"
        />

        {/* Floating Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex gap-1.5 bg-white/80 backdrop-blur border border-slate-200 p-1.5 rounded-xl shadow-md">
          <button 
            onClick={() => setZoom(prev => Math.min(prev + 10, 150))}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(prev - 10, 10))}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-400 italic text-center">Click and drag inside grid to pan. Use Zoom buttons to scale curve.</p>
    </div>
  );
};

/* --- 3. EQUATION & FORMULA EDITOR --- */
const EquationEditor = () => {
  const [latexInput, setLatexInput] = useState('E = mc^2');
  const [previewHtml, setPreviewHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const html = katex.renderToString(latexInput, { displayMode: true, throwOnError: false });
      setPreviewHtml(html);
    } catch (e) {
      setPreviewHtml(`<div class="text-red-500">Invalid LaTeX format</div>`);
    }
  }, [latexInput]);

  const insertSymbol = (symbol) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = latexInput;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    setLatexInput(before + symbol + after);
    setTimeout(() => {
      input.focus();
      input.selectionStart = input.selectionEnd = start + symbol.length;
    }, 10);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`$${latexInput}$`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* LaTeX templates */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto">
        {[
          { label: 'Fraction', code: '\\frac{a}{b}' },
          { label: 'Square Root', code: '\\sqrt{x}' },
          { label: 'Power', code: 'x^{y}' },
          { label: 'Subscript', code: 'x_{i}' },
          { label: 'Summation', code: '\\sum_{i=1}^{n}' },
          { label: 'Integral', code: '\\int_{a}^{b}' },
          { label: 'Pi', code: '\\pi' },
          { label: 'Theta', code: '\\theta' },
          { label: 'Alpha', code: '\\alpha' },
          { label: 'Beta', code: '\\beta' },
          { label: 'Delta', code: '\\Delta' },
          { label: 'Infinity', code: '\\infty' },
        ].map((tpl) => (
          <button
            key={tpl.label}
            onClick={() => insertSymbol(tpl.code)}
            className="px-2.5 py-1.5 text-xs border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-lg transition-colors font-mono"
          >
            {tpl.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <textarea
        ref={inputRef}
        value={latexInput}
        onChange={(e) => setLatexInput(e.target.value)}
        className="w-full h-24 p-4 border border-slate-200 rounded-2xl outline-none focus:border-indigo-400 text-sm font-mono leading-relaxed"
        placeholder="Type LaTeX here..."
      />

      {/* Live Preview */}
      <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-6 min-h-[100px] flex items-center justify-center shadow-inner overflow-x-auto">
        <span className="absolute top-2 left-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Formula Preview</span>
        <div 
          className="select-all overflow-x-auto text-center" 
          dangerouslySetInnerHTML={{ __html: previewHtml }} 
        />
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors shadow-sm"
          title="Copy LaTeX"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
