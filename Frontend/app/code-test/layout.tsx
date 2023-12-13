import "../globals.css";
export const metadata = {
    title: "Ascend.ai | Code Test",
    description: "Where AI meets Interview Mastery.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {/* <Navbar /> */}
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    );
}
