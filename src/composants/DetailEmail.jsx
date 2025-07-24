import React from "react";
import DetailEmailView from "./ux/DetailEmailView";

// Composant de détail d'email : à terme, les données viendront d'un JSON dynamique
const DetailEmail = () => {
  // Exemple statique, à remplacer par une récupération dynamique
  return (
    <DetailEmailView
      title="Winner: Website of the Year"
      sender="Mattered PR"
      senderAvatar="https://randomuser.me/api/portraits/men/32.jpg"
      date="16 Oct. 2023"
      summary="In the fast-paced realm of digital marketing, it's easy for an agency's own branding to take a backseat while they focus on delivering creative brilliance to their clients. At Mattered, we place a high premium on customer experience. We believe that purposeful interactions lead to meaningful connections and it was time to apply the philosophy..."
      image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
      content={<>
        <p className="font-bold text-lg mb-2">What started as a quirky idea turned into an immersive space expedition, ultimately earning Mattered the esteemed Netty Award for 'Best New Website.'</p>
        <p className="mb-2">In the fast-paced realm of digital marketing, it's easy for an agency's own branding to take a backseat while they focus on delivering creative brilliance to their clients. At Mattered, we place a high premium on customer experience.</p>
        <p className="mb-2">We believe that purposeful interactions lead to meaningful connections and it was time to apply the philosophy to ourselves. To walk the walk, if you will. The objective was clear: we needed to create a captivating digital space that would leave a lasting impression on both current and potential clients.</p>
      </>}
      page="16 / 34"
    />
  );
};

export default DetailEmail; 