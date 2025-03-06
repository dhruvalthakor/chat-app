import React from 'react';

function Home() {
  return (
    <div className="h-screen bg-black text-gray-300 flex overflow-hidden">

      {/* Sidebar / Contact List */}
      <div className="w-1/4 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white">ChatApp</h1>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          <ul>
            {['John Doe', 'Jane Smith', 'Dev Team', 'Friends Group'].map((contact, index) => (
              <li 
                key={index} 
                className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900 cursor-pointer transition"
              >
                {contact}
              </li>
            ))}
          </ul>
        </div>

        {/* Profile/Settings at bottom */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              U
            </div>
            <div>
              <p className="font-medium text-white">User Name</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">⚙️</button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-950 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">John Doe</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <button className="text-gray-400 hover:text-white">⋮</button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
          {/* Incoming Message */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">J</div>
            <div className="bg-gray-800 p-3 rounded-lg max-w-xs shadow-lg">
              <p className="text-sm">Hey, how are you?</p>
            </div>
          </div>

          {/* Outgoing Message */}
          <div className="flex items-start space-x-3 justify-end">
            <div className="bg-blue-600 p-3 rounded-lg max-w-xs shadow-lg">
              <p className="text-sm">I'm good, how about you?</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-800 bg-gray-950 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-900 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Send
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
