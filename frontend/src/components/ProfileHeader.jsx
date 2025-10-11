import React from "react";
import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouseClickSound.mp3");
const ProfileHeader = () => {
  const { logout, authuser, updateProfile, isLodding } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);
  // console.log(authuser);

  const handleImageupload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img });
    };
  };
  return (
    <div className="p-6 border-slate-700/50 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={authuser?.profilePic || "/avatar.png"} alt="" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageupload}
            />
          </div>
          {/* Name and Email */}
          <div>
            <h1 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authuser.fullName}
            </h1>
            <p className="text-slate-400 text-xs truncate">Online</p>
          </div>

          <div className="flex gap-4 items-center relative group">
            {/* logOut btn */}
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <LogOutIcon className="size-4 text-slate-400" />
              <span
                className="absolute left-1/2 -translate-x-1/2 top-[-25px] mt-2 
                   px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 
                   group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                Logout
              </span>
            </button>

            {/* sound btn */}
            <button
              className="text-slate-400 hover:text-slate-200 transition-colors"
              onClick={() => {
                mouseClickSound.currentTime = 0;
                mouseClickSound.play().catch((error) => {
                  console.error("Error playing sound:", error);
                });
                toggleSound();
              }}
            >
              {isSoundEnabled ? (
                <Volume2Icon className="size-4" />
              ) : (
                <VolumeOffIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="text-white text-sm">{isLodding ? "Loading..." : null}</div>
    </div>
  );
};

export default ProfileHeader;
