import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, Image as ImageIcon, Send, X, User } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import axios from 'axios';
import {Toaster , toast } from 'sonner';

function MessageForm() {
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji]         = useState(false);

  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files ? e.target.files[0] : null);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedVideo(e.target.files ? e.target.files[0] : null)
    const file = e.target.files?.[0] || null;
    setSelectedVideo(file);
  
    if (!file) return setThumbnail(null);
  
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
  
    video.addEventListener("loadedmetadata", () => {
      video.currentTime = 0;
    });
  
    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/png");
        setThumbnail(imageUrl);
      }
    });

  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('message', message);

    if (selectedImage !== null) {
      formData.append('image', selectedImage);
    }

    if (selectedVideo !== null) {
      formData.append('video', selectedVideo)
    }

    try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/wedding/data`,
          formData,
          { withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.status === 201) {
          toast.success('Data Saved successfully');
        }
        else {
          toast.error('Data Failed');
        }
    }
    catch {
      toast.error(`Can't connected with the End-Point`);
    }

    setName('');
    setMessage('');
    setSelectedVideo(null);
    setSelectedImage(null);
  };

  return (
    <>
      <Toaster richColors position="top-right" closeButton duration={4000} />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8 text-center">Leave Your Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="flex items-center space-x-2 mb-4">
                {/* <User className="h-5 w-5 text-gray-500 dark:text-gray-400" /> */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="flex-1 p-3 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full h-32 p-4 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className="absolute bottom-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                😊
              </button>
              {showEmoji && (
                <div className="absolute bottom-full right-0 mb-2">
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji: any) => {
                      setMessage(message + emoji.native);
                      setShowEmoji(false);
                    }}
                    theme="auto"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white">
                  <Camera className="h-5 w-5 mr-2" />
                  Record Video Message
                </h3>
                {recordingStatus === 'idle' && (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="w-full py-3 px-4 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Start Recording
                  </button>
                )}
                {recordingStatus === 'recording' && (
                  <>
                    <Webcam
                      audio={true}
                      ref={webcamRef}
                      className="w-full rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleStopRecording}
                      className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Stop Recording
                    </button>
                  </>
                )}
                {recordingStatus === 'recorded' && recordedVideo && (
                  <div className="relative">
                    <video src={recordedVideo} controls className="w-full rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setRecordedVideo(null);
                        setRecordingStatus('idle');
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div> */}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Upload Photo
                </h3>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="block w-full py-3 px-4 bg-[#f43f5e] font-semibold dark:bg-[#f43f5e] text-white dark:text-gray-300 rounded-lg hover:bg-[#e11d48] dark:hover:bg-[#e11d48] transition-colors cursor-pointer text-center"
                >
                  Choose Photo
                </label>
                {selectedImage && (
                  <div className="relative">
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white">
                    <Camera className="h-5 w-5 mr-2" />
                    Upload Video
                  </h3>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="block w-full py-3 px-4 font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer text-center"
                  >
                    Choose Video
                  </label>
                  {selectedVideo && (
                    <div className="relative">
                      {thumbnail ? (
                          <img src={thumbnail} alt="Selected video" className="w-full h-48 border-2 object-cover rounded-lg" />
                      ):(
                        <div className="w-full h-48 bg-blue-400 dark:bg-gray-700 rounded-lg animate-pulse" />
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MessageForm;
