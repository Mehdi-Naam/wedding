import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, Image as ImageIcon, Send, X, User } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function MessageForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'recorded'>('idle');

  const handleStartRecording = () => {
    if (webcamRef.current) {
      const stream = webcamRef.current.stream;
      if (stream) {
        mediaRecorderRef.current = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          setRecordedVideo(URL.createObjectURL(blob));
          setRecordingStatus('recorded');
        };

        mediaRecorderRef.current.start();
        setRecordingStatus('recording');
        setTimeout(() => {
          if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
        }, 30000); // 30 second limit
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    // Here you would typically send the data to your backend
    console.log({ name, message, recordedVideo, selectedImage });
    // Reset form
    setName('');
    setMessage('');
    setRecordedVideo(null);
    setSelectedImage(null);
    setRecordingStatus('idle');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-colors duration-200">
        <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-8 text-center">Leave Your Message</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
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
            <div className="space-y-4">
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
            </div>

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
                className="block w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer text-center"
              >
                Choose Photo
              </label>
              {selectedImage && (
                <div className="relative">
                  <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
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
  );
}

export default MessageForm;