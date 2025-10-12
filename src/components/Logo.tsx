export const Logo = () => {
  return (
    <div className="fixed top-6 left-6 z-50 animate-fade-in">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      >
        {/* Accretion disk swirl */}
        <path
          d="M24 4C13.507 4 5 12.507 5 23c0 10.493 8.507 19 19 19 10.493 0 19-8.507 19-19 0-10.493-8.507-19-19-19zm0 2c9.389 0 17 7.611 17 17 0 9.389-7.611 17-17 17-9.389 0-17-7.611-17-17 0-9.389 7.611-17 17-17z"
          fill="url(#gradient1)"
          opacity="0.6"
        />
        {/* Inner swirl */}
        <path
          d="M24 12c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm0 2c4.971 0 9 4.029 9 9s-4.029 9-9 9-9-4.029-9-9 4.029-9 9-9z"
          fill="url(#gradient2)"
          opacity="0.8"
        />
        {/* Center point */}
        <circle cx="24" cy="23" r="4" fill="hsl(var(--secondary))" />
        <circle cx="24" cy="23" r="2" fill="hsl(var(--background))" />
        
        {/* Data stream particles */}
        <circle cx="12" cy="16" r="1.5" fill="hsl(var(--secondary))" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="36" cy="30" r="1.5" fill="hsl(var(--accent))" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="18" cy="36" r="1.5" fill="hsl(var(--secondary))" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
        </circle>
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};