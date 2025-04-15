import React from 'react';
import { Camera, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import background from "./../assous/background.jpeg"

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 transition-colors duration-200">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white text-center mb-6">
            Welcome to Our Digital Guestbook
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 text-center mb-12">
            Share your wishes, memories, and moments with us on our special day
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/message')}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Write a Message</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">Share your wishes and advice</p>
            </button>

            <button
              onClick={() => navigate('/message')}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Camera className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Record Video</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">Leave a video message</p>
            </button>

            <button
              onClick={() => navigate('/gallery')}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <ImageIcon className="h-12 w-12 text-rose-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">View Gallery</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">See all messages and photos</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
