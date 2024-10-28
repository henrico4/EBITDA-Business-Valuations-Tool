import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import EBITDACalculator from './components/EBITDACalculator';

function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  // Handle iframe height adjustments
  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };

    // Send initial height
    sendHeight();

    // Send height on window resize
    window.addEventListener('resize', sendHeight);

    // Send height when content changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { 
      subtree: true, 
      childList: true,
      attributes: true 
    });

    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, [user]); // Re-run when user state changes

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
      {!user ? (
        <LandingPage onSignup={setUser} />
      ) : (
        <EBITDACalculator user={user} />
      )}
    </div>
  );
}

export default App;