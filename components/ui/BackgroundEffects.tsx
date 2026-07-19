import { theme } from "@/lib/theme";

const BackgroundEffects = () => {
  return (
    <>
      {/* Dot Matrix Pattern */}
      <div className={`absolute inset-0 ${theme.effects.dot_matrix} pointer-events-none z-[-1]`}></div>

      {/* Neon Glow Blobs */}
      <div className={`absolute top-[-5%] left-[-5%] w-[650px] h-[650px] ${theme.effects.neon_glow} opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]`}></div>
      <div className={`absolute top-[35%] right-[-10%] w-[650px] h-[650px] ${theme.effects.neon_glow} opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]`}></div>
      <div className={`absolute top-[50%] left-[-5%] w-[650px] h-[650px] ${theme.effects.neon_glow} opacity-50 pointer-events-none z-[-1] animate-pulse [animation-duration:12s]`}></div>
    </>
  );
};

export default BackgroundEffects;
