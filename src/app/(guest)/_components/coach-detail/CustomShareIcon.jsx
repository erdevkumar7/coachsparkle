"use client";

import ShareIcon from "@mui/icons-material/Share";
import { toast } from "react-toastify";

export default function CustomShareIcon({ coach, package_id }) {

  const handleShareCoach = async () => {

    let shareUrl = "";
    let shareText = "";

    // If package_id exists → share package
    if (coach?.user_id && package_id) {
      shareUrl = `${window.location.origin}${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/coach-detail/${coach.user_id}?package_id=${package_id}`;
      shareText = `Check out ${coach?.first_name} ${coach?.last_name}'s package on CoachSparkle`;
    }
    // Otherwise → share coach profile
    else if (coach?.user_id) {
      shareUrl = `${window.location.origin}${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/coach-detail/${coach.user_id}`;
      shareText = `Check out ${coach?.first_name} ${coach?.last_name} - ${coach?.professional_title} on CoachSparkle`;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${coach?.first_name} ${coach?.last_name}`,
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } else {
        copyToClipboardFallback(shareUrl);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      } else {
        copyToClipboardFallback(shareUrl);
      }
    }
  };

  const copyToClipboardFallback = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div
      className="coach-action-share-icon"
      onClick={handleShareCoach}
    >
      <ShareIcon className="mui-iconss share-icons-add" />
    </div>
  );
}