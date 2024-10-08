import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
export const metadata = {
  title: "PropertyPulse | Find Perfect Rental",
  description: "Find your dream rental property ",
  keywords: "property, rental, search, real estate, find property",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
