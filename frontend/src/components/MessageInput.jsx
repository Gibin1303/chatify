import React, { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyBoardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { isSoundEnabled, sendMessage } = useChatStore();
     




  const handleMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMessageFile = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("add only images");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

    const containerRef = useRef()
        
     const scrollToBottom = (behavior = "smooth") => {
  const container = containerRef.current;
  if (!container) return;

  const offset = 80; // px from bottom
  const targetScrollTop = container.scrollHeight - container.clientHeight - offset;

  container.scrollTo({
    top: targetScrollTop > 0 ? targetScrollTop : 0,
    behavior,
  });
};
  return (
    <div className="p-4 border-t border-slate-700/50">
      {imagePreview && (
        <div className="relative group">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 left-80  bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleMessage}
        className="max-w-3xl mx-auto flex space-x-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/50 border border-slate-700/50 border-lg py-2 px-4 text-white"
          placeholder="Enter messages"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleMessageFile}
          className="hidden"
        />

        <button
        type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
            imagePreview ? "text-cyan-500" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button   type="submit"
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors`} ref={containerRef} onClick={scrollToBottom}><SendIcon/></button>
      </form>
    </div>
  );
};

export default MessageInput;
