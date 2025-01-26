import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from 'react-oidc-context';

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_vdNqe2lcv",
  client_id: "4agk91l6cm72svctrmq5fn1rsu",
  redirect_uri: import.meta.env.VITE_REDIRECT_URL,
  response_type: "code",
  scope: "phone openid email",
};



createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </StrictMode>
)
