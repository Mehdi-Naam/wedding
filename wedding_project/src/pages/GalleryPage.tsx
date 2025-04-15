import React, { useState } from 'react';
import { MessageCircle, Camera, Image as ImageIcon } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockMessages = [
  {
    id: 1,
    type: 'text',
    content: 'Wishing you a lifetime of love and happiness! 💕',
    author: 'Sarah & John',
    timestamp: '2024-03-15T14:30:00Z',
  },
  {
    id: 2,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=3870&ixlib=rb-4.0.3',
    author: 'Mike & Lisa',
    timestamp: '2024-03-15T15:00:00Z',
  },
  {
    id: 3,
    type: 'video',
    content: 'https://example.com/video1.mp4',
    author: 'David & Emma',
    timestamp: '2024-03-15T15:30:00Z',
  },
];

function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'text' | 'video' | 'image'>('all');

  const filteredMessages = mockMessages.filter(
    message => filter === 'all' || message.type === filter
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8 text-center">Wedding Memories</h2>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
              filter === 'all' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>All</span>
          </button>
          <button
            onClick={() => setFilter('text')}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
              filter === 'text' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            <span>Messages</span>
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
              filter === 'video' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Camera className="h-5 w-5" />
            <span>Videos</span>
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
              filter === 'image' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            <span>Photos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMessages.map((message) => (
            <div key={message.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
              {message.type === 'image' && (
                <img src={message.content} alt="" className="w-full h-48 object-cover" />
              )}
              {message.type === 'video' && (
                <video src={message.content} controls className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                {message.type === 'text' && (
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">{message.content}</p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{message.author}</span>
                  <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;