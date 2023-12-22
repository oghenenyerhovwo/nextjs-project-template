import "./globals.css";

import { GoogleOAuthProvider } from '@react-oauth/google';

import {
  Nav,
  ReduxProvider,
} from "@/components/";

export const metadata = {
  title: "Secure Rent",
  description: "Find houses online in Nigeria",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <ReduxProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_GOOGLE_ID}>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </GoogleOAuthProvider>
      </ReduxProvider>
    </body>
  </html>
);

export default RootLayout;
