import React, { useEffect, useState } from 'react';
import { MessageCircle, Camera, Image as ImageIcon } from 'lucide-react';

import axios from 'axios';
import {Toaster , toast } from 'sonner';

import { formatDistanceToNow }                from "date-fns";

const URL        = `http://127.0.0.1:8000/api/wedding/data`;
const avatar_URL = `http://127.0.0.1:8000/api`;

// Mock data - replace with actual data from your backend

const getAllData = () => {

  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          URL,
          { withCredentials: true}
        );

        if (response.status === 200) {
          setAllData(response.data);
          toast.success('Data Uploaded successfully');
        }
        else {
          toast.error('Uploading Data Failed');
        }
    }
    catch {
      toast.error(`Can't connected to End-Point`);
    }
    } 

    getData();
  }, []);

  return {allData, loading, error};

}

function GalleryPage() {
  const [filter, setFilter] = useState<'all' | 'text' | 'video' | 'image'>('all');



  const { allData } = getAllData();

  const mockMessages = allData?.map((item: any, index: number) => {
    let type = 'text';
    let content = item.message;
  
    if (item.video) {
      type = 'video';
      content = `${avatar_URL}${item.video}`;
    } else if (item.image) {
      type = 'image';
      content = `${avatar_URL}${item.image}`;
    }
  
    return {
      id: index + 1, // or generate a unique ID
      type: type,
      content: content,
      author: item.full_name,
      timestamp: formatDistanceToNow(new Date(item.time), { addSuffix: true }), // no timestamp in model, use current time
    };
  }) || [];

  const filteredMessages = mockMessages.filter(
    message => filter === 'all' || message.type === filter
  );
  
  return (
    <>
      <Toaster richColors position="top-right" closeButton duration={4000} />
      <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8 text-center">Wedding Memories</h2>

          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                filter === 'all' ? 'bg-rose-500 text-white' 
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
                      <div key={message.id} className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
                          {message.type === 'image' && (
                            <img src={message.content} alt="" className="w-full h-48 object-cover" />
                          )}
                          {message.type === 'video' && (
                            <video src={message.content} controls className="w-full h-48 object-fit" />
                          )}
                          {message.type === 'text' && (
                              <div className="px-4 pt-4">
                                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">{message.content}</p>
                              </div>
                          )}
                          <div className="p-4 relative mt-auto">
                              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                <span>{message.author}</span>
                                <span>{message.timestamp}</span>
                              </div>
                          </div>
                      </div>
                    ))
                }
          </div>
        
        </div>
      </div>
    </>
  );
}

export default GalleryPage;