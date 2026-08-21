'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Link2, Quote, RemoveFormatting } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label: string;
}

export default function RichTextEditor({ value, onChange, placeholder, label }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Trigger client-only mount to prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const execCommand = (command: string, value: string = '') => {
    if (!mounted || typeof window === 'undefined') return;
    
    // Simple robust command execution
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-1.5 animate-pulse">
        <label className="text-xs font-semibold text-slate-600">{label}</label>
        <div className="h-40 bg-slate-100 rounded-xl border border-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-600">{label}</label>
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-emerald focus-within:ring-1 focus-within:ring-emerald transition-all">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 bg-slate-50 border-b border-slate-200 p-1.5">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h1>')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h2>')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<blockquote>')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-1" />
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter link URL:');
              if (url) execCommand('createLink', url);
            }}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Link"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('removeFormat')}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
            title="Remove Formatting"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
          className="p-3 min-h-[150px] max-h-[300px] overflow-y-auto text-sm text-slate-800 focus:outline-none prose prose-sm max-w-none"
          {...({ placeholder } as any)}
          style={{ minHeight: '150px' }}
        />
      </div>
    </div>
  );
}
