import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import logo from '../../asset/logo/Nexus-logo.png';
import api from '../../services/api';

interface EmailTemplate {
  id: number;
  title: string;
  subject: string;
  icon: string;
  color: string;
  preview: string;
  isCustom?: boolean;
}

/* -------------------- EMAIL TEMPLATES -------------------- */
const initialEmailTemplates: EmailTemplate[] = [
  {
    id: 1,
    title: 'Welcome Email',
    subject: 'Welcome to Nexusance',
    icon: '👋',
    color: 'from-blue-500 to-blue-600',
    preview: `Dear [Recipient Name],

Welcome to Nexusance! We're excited to have you on board.

[Your custom message here]

🌐 Visit our website:
https://www.Nexusnce.com.au/
`
  },
  {
    id: 2,
    title: 'Follow-Up Email',
    subject: 'Following Up on Your Inquiry',
    icon: '📧',
    color: 'from-green-500 to-green-600',
    preview: `Dear [Recipient Name],

Thank you for your interest in our services.

[Your custom message here]

🌐 Visit our website:
https://www.Nexusnce.com.au/
`
  },
  {
    id: 3,
    title: 'Promotion Email',
    subject: 'Special Offer from Nexusance',
    icon: '🎯',
    color: 'from-orange-500 to-orange-600',
    preview: `Dear [Recipient Name],

We have a special offer tailored just for you!

[Your custom message here]

🌐 Visit our website:
https://www.Nexusnce.com.au/
`
  },
  {
    id: 4,
    title: 'Newsletter Email',
    subject: 'Latest Updates from Nexusance',
    icon: '📰',
    color: 'from-purple-500 to-purple-600',
    preview: `Dear [Recipient Name],

Here are the latest updates from Nexusance.

[Your custom message here]

🌐 Visit our website:
https://www.Nexusnce.com.au/
`
  }
];

type BlockType = 'heading' | 'text' | 'button' | 'image' | 'divider' | 'spacer' | 'link';

interface EmailBlock {
  id: string;
  type: BlockType;
  content: string;
  link?: string;
  color?: string;
  backgroundColor?: string;
}

export default function SalesEmailTemplates() {
  const { isDarkMode } = useTheme();
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialEmailTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [customContents, setCustomContents] = useState<{ [key: number]: string }>({});
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [sending, setSending] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  // Builder State
  const [builderBlocks, setBuilderBlocks] = useState<EmailBlock[]>([]);
  const [draggedBlockIndex, setDraggedBlockIndex] = useState<number | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    subject: ''
  });
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    message: string;
    title?: string;
    isConfirmation?: boolean;
    onConfirm?: () => void;
  }>({ isOpen: false, message: '' });

  // Load custom templates from backend on component mount
  useEffect(() => {
    const loadCustomTemplates = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('https://Nexus-new-backend.onrender.com/api/templates', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Data is wrapped in {success, data: [...], count}
          if (data.success && Array.isArray(data.data)) {
            const formattedTemplates = data.data.map((template: any) => ({
              id: template._id,
              title: template.title || 'Custom Template',
              subject: template.subject || 'Custom Subject',
              icon: template.icon || '🎨',
              color: template.color || 'from-pink-500 to-rose-500',
              preview: template.content || template.body || '',
              isCustom: true,
              backendId: template._id
            }));
            setTemplates(prev => {
              // Avoid duplicates by checking if template already exists
              const existingIds = new Set(prev.map(t => t.id));
              const newTemplates = formattedTemplates.filter(t => !existingIds.has(t.id));
              return [...prev, ...newTemplates];
            });
          }
        }
      } catch (error) {
        console.error('Error loading custom templates:', error);
      }
    };

    loadCustomTemplates();
  }, []);

  const handleContentChange = (id: number, content: string) => {
    setCustomContents((prev) => ({ ...prev, [id]: content }));
  };

  const handleCreateTemplate = async () => {
    if (!newTemplate.title || !newTemplate.subject || builderBlocks.length === 0) {
      setDialog({ isOpen: true, title: 'Incomplete Form', message: 'Please fill in the title, subject, and add at least one element.' });
      return;
    }

    // Compile blocks to HTML
    const htmlContent = compileBlocksToHTML(builderBlocks);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setDialog({ isOpen: true, title: 'Authentication Error', message: 'Authentication required. Please log in again.' });
        return;
      }

      const response = await fetch('https://Nexus-new-backend.onrender.com/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTemplate.title,
          subject: newTemplate.subject,
          content: htmlContent,
          icon: '🎨',
          color: 'from-pink-500 to-rose-500',
          customStyles: `body { font-family: Arial, sans-serif; }`
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reload templates from API to automatically include the new one
        const loadResponse = await fetch('https://Nexus-new-backend.onrender.com/api/templates', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (loadResponse.ok) {
          const loadData = await loadResponse.json();
          if (loadData.success && Array.isArray(loadData.data)) {
            const formattedTemplates = loadData.data.map((template: any) => ({
              id: template._id,
              title: template.title || 'Custom Template',
              subject: template.subject || 'Custom Subject',
              icon: template.icon || '🎨',
              color: template.color || 'from-pink-500 to-rose-500',
              preview: template.content || template.body || '',
              isCustom: true,
              backendId: template._id
            }));
            setTemplates([...initialEmailTemplates, ...formattedTemplates]);
            // Set custom contents for all custom templates
            const newCustomContents: { [key: string]: string } = {};
            formattedTemplates.forEach((template: any) => {
              newCustomContents[template.id] = template.preview;
            });
            setCustomContents(newCustomContents);
          }
        }

        setIsCreating(false);
        setNewTemplate({ title: '', subject: '' });
        setBuilderBlocks([]);
        setDialog({ isOpen: true, title: 'Success', message: 'Template created successfully!' });
      } else {
        setDialog({ isOpen: true, title: 'Error', message: `Failed to create template: ${data.message}` });
      }
    } catch (error) {
      console.error('Error creating template:', error);
      setDialog({ isOpen: true, title: 'Error', message: 'An error occurred while creating the template.' });
    }
  };

  // --- Builder Logic ---
  const addBlock = (type: BlockType) => {
    const newBlock: EmailBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'heading' ? 'New Heading' : 
               type === 'text' ? 'Write your text here...' : 
               type === 'button' ? 'Click Me' : 
               type === 'image' ? 'https://via.placeholder.com/600x200' :
               type === 'link' ? 'Visit Website' : '',
      link: (type === 'button' || type === 'link') ? '#' : undefined,
      color: type === 'heading' ? '#1a1a1a' : type === 'text' ? '#4a4a4a' : type === 'link' ? '#2563eb' : undefined,
      backgroundColor: type === 'button' ? '#2563eb' : undefined
    };
    setBuilderBlocks([...builderBlocks, newBlock]);
  };

  const updateBlock = (id: string, field: keyof EmailBlock, value: string) => {
    setBuilderBlocks(blocks => blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const removeBlock = (id: string) => {
    setBuilderBlocks(blocks => blocks.filter(b => b.id !== id));
  };

  // Drag and Drop Reordering
  const handleDragStart = (index: number) => {
    setDraggedBlockIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedBlockIndex === null || draggedBlockIndex === index) return;

    const newBlocks = [...builderBlocks];
    const draggedItem = newBlocks[draggedBlockIndex];
    newBlocks.splice(draggedBlockIndex, 1);
    newBlocks.splice(index, 0, draggedItem);
    
    setBuilderBlocks(newBlocks);
    setDraggedBlockIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedBlockIndex(null);
  };

  const compileBlocksToHTML = (blocks: EmailBlock[]) => {
    let html = '<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">';
    
    blocks.forEach(block => {
      switch (block.type) {
        case 'heading':
          html += `<h1 style="color: ${block.color || '#1a1a1a'}; font-size: 24px; margin-bottom: 16px;">${block.content}</h1>`;
          break;
        case 'text':
          html += `<p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px; color: ${block.color || '#4a4a4a'};">${block.content.replace(/\n/g, '<br/>')}</p>`;
          break;
        case 'button':
          html += `
            <div style="text-align: center; margin: 24px 0;">
              <a href="${block.link || '#'}" style="background-color: ${block.backgroundColor || '#2563eb'}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                ${block.content}
              </a>
            </div>`;
          break;
        case 'image':
          html += `
            <div style="margin: 20px 0;">
              <img src="${block.content}" alt="Image" style="width: 100%; max-width: 100%; height: auto; border-radius: 8px;" />
            </div>`;
          break;
        case 'link':
          html += `<p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;"><a href="${block.link || '#'}" style="color: ${block.color || '#2563eb'}; text-decoration: underline;">${block.content}</a></p>`;
          break;
        case 'divider':
          html += `<hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />`;
          break;
        case 'spacer':
          html += `<div style="height: 32px;"></div>`;
          break;
      }
    });

    html += '</div>';
    return html;
  };

  const generateEmailBody = (template: any) => {
    if (template.isCustom) {
      return customContents[template.id] || template.preview;
    }
    return (
      template.preview.replace(
        '[Your custom message here]',
        customContents[template.id] || '[Your custom message here]'
      )
    );
  };

  const handleDeleteTemplate = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDialog({
      isOpen: true,
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this template?',
      isConfirmation: true,
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setDialog({ isOpen: true, title: 'Authentication Error', message: 'Authentication required. Please log in again.' });
            return;
          }

          const template = templates.find(t => t.id === id);
          if (!template || !(template as any).backendId) {
            setDialog({ isOpen: true, title: 'Error', message: 'Template not found or invalid.' });
            return;
          }

          const response = await fetch(`https://Nexus-new-backend.onrender.com/api/templates/${(template as any).backendId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setTemplates((prev) => prev.filter((t) => t.id !== id));
            if (selectedTemplate === id) {
              setSelectedTemplate(null);
            }
            setDialog({ isOpen: true, title: 'Success', message: 'Template deleted successfully!' });
          } else {
            const data = await response.json();
            setDialog({ isOpen: true, title: 'Error', message: `Failed to delete template: ${data.message}` });
          }
        } catch (error) {
          console.error('Error deleting template:', error);
          setDialog({ isOpen: true, title: 'Error', message: 'An error occurred while deleting the template.' });
        }
      },
    });
  };

  const handleSend = async () => {
    if (!selectedTemplate || !recipientEmail) {
      setDialog({ isOpen: true, title: 'Input Required', message: 'Please select a template and enter a recipient email.' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      setDialog({ isOpen: true, title: 'Invalid Email', message: 'Please enter a valid email address.' });
      return;
    }

    setSending(true);
    try {
      const template = templates.find(t => t.id === selectedTemplate);

      const payload = (template as any)?.isCustom
        ? {
            templateId: (template as any)?.backendId || selectedTemplate.toString(),
            toEmail: recipientEmail,
            subject: customSubject || template?.subject,
            dynamicValues: {
              name: recipientName || 'Valued Customer'
            },
            isCustom: true
          }
        : {
            templateId: selectedTemplate.toString(),
            toEmail: recipientEmail,
            subject: customSubject || template?.subject,
            dynamicValues: {
              name: recipientName || 'Valued Customer',
              message: customContents[selectedTemplate] || ''
            },
            isCustom: false
          };

      const { data } = await api.post('/api/emails/manual-send', payload);

      setDialog({
        isOpen: true,
        title: 'Success',
        message: data.message || 'Email sent successfully!'
      });
      setRecipientEmail('');
      setRecipientName('');
    } catch (error: any) {
      console.error('Error sending email:', error);
      setDialog({ isOpen: true, title: 'Error', message: error.response?.data?.message || 'An error occurred while sending the email.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Sales Email Templates
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Choose and customize professional email templates
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Template List */}
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Choose Template
          </h2>
          
          <button
            onClick={() => { setIsCreating(true); setSelectedTemplate(null); }}
            className="w-full mb-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2 font-medium"
          >
            <span>+</span> Create Custom Template
          </button>

          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition relative group ${
                  selectedTemplate === template.id
                    ? `bg-gradient-to-r ${template.color} text-white border-transparent`
                    : isDarkMode
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{template.icon}</span>
                  <div>
                    <h3 className="font-medium">{template.title}</h3>
                    <p className="text-sm opacity-80">{template.subject}</p>
                  </div>
                </div>

                {(template as any)?.isCustom && (
                  <button
                    onClick={(e) => handleDeleteTemplate(template.id, e)}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
                      selectedTemplate === template.id
                        ? 'text-white hover:bg-white/20'
                        : 'text-gray-400 hover:bg-red-100 hover:text-red-600'
                    }`}
                    title="Delete Template"
                  >
                    <span className="text-xs font-bold">✕</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {isCreating ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>New Template</h2>
                <button onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Template Name</label>
                <input
                  type="text"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                  className={`w-full rounded-lg border p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="e.g., Summer Sale"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject Line</label>
                <input
                  type="text"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                  className={`w-full rounded-lg border p-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="e.g., Don't miss out!"
                />
              </div>
              
              {/* Visual Builder */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Content Builder</label>
                
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Sidebar - Elements */}
                  <div className="w-full lg:w-1/3 space-y-2">
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Elements</p>
                    <button onClick={() => addBlock('heading')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">H1</span> Heading
                    </button>
                    <button onClick={() => addBlock('text')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">¶</span> Text Paragraph
                    </button>
                    <button onClick={() => addBlock('button')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">🔘</span> Button
                    </button>
                    <button onClick={() => addBlock('image')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">🖼️</span> Image
                    </button>
                    <button onClick={() => addBlock('link')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">🔗</span> Website Link
                    </button>
                    <button onClick={() => addBlock('divider')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">➖</span> Divider
                    </button>
                    <button onClick={() => addBlock('spacer')} className={`w-full text-left p-3 rounded border hover:bg-blue-50 hover:border-blue-300 transition flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:text-blue-400' : 'bg-white border-gray-200'}`}>
                      <span className="text-lg">⬜</span> Spacer
                    </button>
                  </div>

                  {/* Canvas - Builder Area */}
                  <div className={`w-full lg:w-2/3 min-h-[400px] border-2 border-dashed rounded-xl p-4 space-y-3 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
                    {builderBlocks.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <p>Click elements on the left to add them.</p>
                      </div>
                    )}
                    
                    {builderBlocks.map((block, index) => (
                      <div 
                        key={block.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`group relative p-4 rounded-lg border cursor-move transition-all ${
                          draggedBlockIndex === index ? 'opacity-50 scale-95' : 'opacity-100'
                        } ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}
                      >
                        {/* Delete Button */}
                        <button 
                          onClick={() => removeBlock(block.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>

                        {/* Block Content Editors */}
                        {block.type === 'heading' && (
                          <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={block.content} 
                              onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                              className={`w-full text-xl font-bold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                            />
                            <input
                              type="color"
                              value={block.color || '#1a1a1a'}
                              onChange={(e) => updateBlock(block.id, 'color', e.target.value)}
                              className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent"
                            />
                          </div>
                        )}

                        {block.type === 'text' && (
                          <div className="flex items-start gap-2">
                            <textarea 
                              value={block.content} 
                              onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                              className={`w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none resize-none ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                              rows={3}
                            />
                            <input
                              type="color"
                              value={block.color || '#4a4a4a'}
                              onChange={(e) => updateBlock(block.id, 'color', e.target.value)}
                              className="w-8 h-8 p-0 border-none rounded-md cursor-pointer flex-shrink-0 bg-transparent"
                            />
                          </div>
                        )}

                        {block.type === 'button' && (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <input 
                                type="text" 
                                value={block.content} 
                                onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                                className="w-full text-white px-4 py-2 rounded text-center font-medium"
                                placeholder="Button Text"
                                style={{ backgroundColor: block.backgroundColor || '#2563eb' }}
                              />
                              <input
                                type="color"
                                value={block.backgroundColor || '#2563eb'}
                                onChange={(e) => updateBlock(block.id, 'backgroundColor', e.target.value)}
                                className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-transparent"
                              />
                            </div>
                            <input 
                              type="text" 
                              value={block.link} 
                              onChange={(e) => updateBlock(block.id, 'link', e.target.value)}
                              placeholder="Link URL (https://...)"
                              className={`w-full px-3 py-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                          </div>
                        )}

                        {block.type === 'image' && (
                          <div className="space-y-3">
                            {block.content && (
                              <img 
                                src={block.content} 
                                alt="Preview" 
                                className="w-full h-auto max-h-60 object-contain rounded-lg border border-gray-200 bg-gray-50"
                              />
                            )}
                            <input 
                              type="text" 
                              value={block.content} 
                              onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                              placeholder="Image URL"
                              className={`w-full px-3 py-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                          </div>
                        )}

                        {block.type === 'link' && (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                              <input 
                                type="text" 
                                value={block.content} 
                                onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                                className={`w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                                placeholder="Link Text"
                              />
                              <input
                                type="color"
                                value={block.color || '#2563eb'}
                                onChange={(e) => updateBlock(block.id, 'color', e.target.value)}
                                className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent"
                              />
                            </div>
                            <input 
                              type="text" 
                              value={block.link} 
                              onChange={(e) => updateBlock(block.id, 'link', e.target.value)}
                              placeholder="Link URL (https://...)"
                              className={`w-full px-3 py-2 rounded border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                            />
                          </div>
                        )}

                        {block.type === 'divider' && <hr className="border-gray-300 my-2" />}
                        {block.type === 'spacer' && <div className="h-8 bg-gray-100/10 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">Spacer</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCreateTemplate}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Save Template
              </button>
            </div>
          ) : selectedTemplate ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <img src={logo} className="w-10 h-10" />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Customize Email
                </h2>
              </div>

              {/* Recipient Details Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="client@example.com"
                    className={`w-full rounded-lg border p-2 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full rounded-lg border p-2 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject (optional)
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder={templates.find(t => t.id === selectedTemplate)?.subject}
                  className={`w-full rounded-lg border p-2 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                />
              </div>

              <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{templates.find(t => t.id === selectedTemplate)?.isCustom ? 'HTML Content' : 'Message Content'}</label>
              <textarea
                rows={8}
                value={customContents[selectedTemplate] || ''}
                onChange={(e) => handleContentChange(selectedTemplate, e.target.value)}
                placeholder={templates.find(t => t.id === selectedTemplate)?.isCustom ? "<div>...</div>" : "Enter your custom message..."}
                className={`w-full rounded-lg border p-3 resize-none ${templates.find(t => t.id === selectedTemplate)?.isCustom ? 'font-mono text-sm' : ''} ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      generateEmailBody(
                        templates.find((t) => t.id === selectedTemplate)
                      )
                    )
                  }
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Copy Email
                </button>

                <button 
                  onClick={handleSend}
                  disabled={sending}
                  className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {sending ? 'Sending...' : 'Send Email'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Select a template to begin</p>
          )}
        </div>
      </div>

      {/* Email Preview */}
      {selectedTemplate && (
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`text-xl font-semibold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Email Preview
          </h2>

          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border-2">
            {/* Email Header - Subject Line */}
            <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center gap-3 ${isDarkMode ? 'bg-gradient-to-r from-blue-700 to-indigo-700' : ''}`}>
              <span className="text-2xl">📧</span>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">
                  {templates.find((t) => t.id === selectedTemplate)?.subject}
                </h3>
                <p className="text-blue-100 text-sm">Nexusance - Commercial Finance Experts</p>
              </div>
            </div>

            {/* Email Metadata */}
            <div className={`px-6 py-4 border-b ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600 dark:text-gray-300">From:</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{'Nexusance <info@NeNeNexuscom.au>'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600 dark:text-gray-300">To:</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{`${recipientName || '[Recipient Name]'} <${recipientEmail || '[recipient@email.com]'}>`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600 dark:text-gray-300">Subject:</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{customSubject || templates.find((t) => t.id === selectedTemplate)?.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-600 dark:text-gray-300">Date:</span>
                  <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className={`p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              {/* Greeting and Content */}
              <div className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {templates.find(t => t.id === selectedTemplate)?.isCustom ? (
                  <div dangerouslySetInnerHTML={{ __html: generateEmailBody(templates.find(t => t.id === selectedTemplate)) }} />
                ) : (
                  generateEmailBody(
                  templates.find((t) => t.id === selectedTemplate)
                  ).split('\n').map((line: string, index: number) => {
                  if (line.includes('https://')) {
                    return (
                      <p key={index} className="mb-4">
                        {line.split('https://')[0]}
                        <a
                          href={`https://${line.split('https://')[1]}`}
                          className="text-blue-600 hover:text-blue-800 underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://{line.split('https://')[1]}
                        </a>
                      </p>
                    );
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-4">{line}</p>;
                  }
                })
                )}
              </div>

              {/* Footer */}
              <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <img src={logo} className="w-12 h-12 bg-white p-1 rounded-lg shadow-sm" alt="Nexusance Logo" />
                  <div>
                    <h4 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Nexusance</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Commercial Finance Brokers</p>
                  </div>
                </div>
                <div className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p> </p>
                  <p> | </p>
                </div>
                <div className="mt-4 flex gap-4">
                  <a href="https://www.Nexusnce.com.au/" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
                    Visit Our Website
                  </a>
                  <span className="text-gray-400">|</span>
                  <a href="mailto:info@Nexusnce.com.au" className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {dialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-xl max-w-md w-full p-6 shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {dialog.title && (
              <h3 className="text-lg font-semibold mb-4">{dialog.title}</h3>
            )}
            <p className="mb-6">{dialog.message}</p>
            <div className="flex justify-end gap-4">
              {dialog.isConfirmation && (
                <button
                  onClick={() => setDialog({ isOpen: false, message: '' })}
                  className={`px-4 py-2 rounded font-medium transition-colors ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Cancel
                </button>
              )}
              <button
                onClick={() => {
                  const confirmAction = dialog.onConfirm;
                  setDialog({ isOpen: false, message: '' });
                  if (confirmAction) {
                    confirmAction();
                  }
                }}
                className={`px-4 py-2 text-white rounded font-medium transition-colors ${
                  dialog.isConfirmation ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {dialog.isConfirmation ? 'Delete' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
