"use client";
import ShareIcon from '@mui/icons-material/Share';

export default function CustomShareIcon({ coach }) {
    // Add this function to your component
    const handleShareCoach = async (coach) => {
        const coachProfileUrl = `${window.location.origin}${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/coach-detail/${coach?.user_id}`;
        const shareText = `Check out ${coach?.first_name} ${coach?.last_name} - ${coach?.professional_title} on CoachSparkle`;

        try {
            if (navigator.share) {
                // Web Share API (mobile devices)
                await navigator.share({
                    title: `${coach?.first_name} ${coach?.last_name} - Coach Profile`,
                    text: shareText,
                    url: coachProfileUrl,
                });
            } else if (navigator.clipboard) {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(coachProfileUrl);
                toast.success("Profile link copied to clipboard!");
            } else {
                // Fallback for older browsers
                copyToClipboardFallback(coachProfileUrl);
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // If Web Share API fails, fallback to clipboard
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(coachProfileUrl);
                toast.success("Profile link copied to clipboard!");
            } else {
                copyToClipboardFallback(coachProfileUrl);
            }
        }
    };

    // Fallback function for clipboard
    const copyToClipboardFallback = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success("Profile link copied to clipboard!");
    };

    return (
        <div className="coach-action-share-icon" onClick={() => handleShareCoach(coach)}>
            <ShareIcon className="mui-iconss share-icons-add" />
        </div>
    );
}