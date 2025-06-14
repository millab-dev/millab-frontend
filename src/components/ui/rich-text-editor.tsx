"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Eraser
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-4 space-y-1',
        },
        keepMarks: true,
        keepAttributes: false,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-4 space-y-1',
        },
        keepMarks: true,
        keepAttributes: false,
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'leading-normal',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          const { from, to } = view.state.selection;
          const spaces = '    ';
          view.dispatch(view.state.tr.insertText(spaces, from, to));
          return true;
        }
        return false;
      },
      // Minimal cleanup - just fix the list issues
      transformPastedHTML: (html) => {
        return html
          // Fix Google Docs list structure only
          .replace(/<li[^>]*><p[^>]*>/g, '<li>')
          .replace(/<\/p><\/li>/g, '</li>')
          // Remove empty paragraphs
          .replace(/<p[^>]*>\s*<\/p>/g, '')
          .replace(/<p[^>]*><br[^>]*>\s*<\/p>/g, '');
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex items-center gap-1 flex-wrap">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (!editor) return;
            
            const currentContent = editor.getHTML();
            
            try {
              const cleanedContent = currentContent
                .replace(/<li><p>/g, '<li>')
                .replace(/<\/p><\/li>/g, '</li>')
                .replace(/<p[^>]*>\s*<\/p>/g, '')
                .replace(/<p[^>]*><br[^>]*><\/p>/g, '')
                .replace(/(<br[^>]*>){2,}/g, '<br>')
                .replace(/\s+/g, ' ')
                .replace(/>\s+</g, '><')
                .trim();
              
              editor.commands.setContent(cleanedContent);
            } catch (error) {
              console.error('Error cleaning content:', error);
            }
          }}
          title="Clean Formatting"
        >
          <Eraser className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent 
        editor={editor} 
        className="min-h-32"
        placeholder={placeholder}
      />

      <style jsx>{`
        :global(.ProseMirror) {
          outline: none;
        }
        
        :global(.ProseMirror ul, .ProseMirror ol) {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        :global(.ProseMirror li) {
          margin: 0;
          padding: 0;
          line-height: 1.6;
          list-style-position: outside;
        }
        
        :global(.ProseMirror li p) {
          margin: 0 !important;
          padding: 0 !important;
          display: inline;
        }
        
        :global(.ProseMirror li > p:first-child) {
          display: inline;
        }
        
        :global(.ProseMirror li > p:last-child) {
          display: inline;
        }
        
        :global(.ProseMirror li > p:only-child) {
          display: inline;
        }
        
        :global(.ProseMirror p:empty) {
          display: none;
        }
        
        :global(.ProseMirror strong) {
          font-weight: bold;
        }
        
        :global(.ProseMirror em) {
          font-style: italic;
        }
        
        :global(.ProseMirror u) {
          text-decoration: underline;
        }
        
        :global(.ProseMirror li::marker) {
          color: inherit;
        }
        
        :global(.ProseMirror li *) {
          margin-top: 0;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}