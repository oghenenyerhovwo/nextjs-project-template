import "./globals.css";

import {
  Nav,
  Provider,
} from "@/components/";

export const metadata = {
  title: "Secure Rent",
  description: "Find houses online in Nigeria",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
