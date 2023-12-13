import "./globals.css";
// import Navbar from './components/Navbar/index';
// import Footer from './components/Footer/Footer';
import { ClerkProvider } from "@clerk/nextjs";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
    title: "Ascend.ai",
    description: "Where AI meets Interview Mastery.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <body>
                    {/* <Navbar /> */}
                    {children}
                    {/* <Footer /> */}
                </body>
            </html>
        </ClerkProvider>
    );
}
