import { AvatarCreator } from "@readyplayerme/react-avatar-creator";

const config = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

const style = { width: "100%", height: "100vh", border: "none" };

export default function App() {
  const handleOnUserSet = (event) => {
    console.log(`User ID is: ${event.data.id}`);
  };

  const handleOnAvatarExported = async (event) => {
    const avatarUrl = event.data.url;
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "avatar.glb"); // or any other filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AvatarCreator
        subdomain="demo"
        config={config}
        style={style}
        onUserSet={handleOnUserSet}
        onAvatarExported={handleOnAvatarExported}
      />
    </>
  );
}
