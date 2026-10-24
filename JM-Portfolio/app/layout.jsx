import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
  title: "JM MARTIN | PORTFOLIO",

  description:
    "Portfolio of John Mike Martin, showcasing web and mobile application development, database management, and AI automation.",

  applicationName: "JM MARTIN | PORTFOLIO",

  keywords: [
    "John Mike Martin",
    "JM Martin",
    "Portfolio",
    "Web Developer",
    "Mobile Developer",
    "Software Developer",
    "React.js",
    "Next.js",
    "Python",
    "JavaScript",
    "AI Automation",
  ],

  openGraph: {
    title: "JM MARTIN | PORTFOLIO",

    description:
      "Explore the projects, technical skills, and digital solutions of John Mike Martin.",

    siteName: "JM MARTIN | PORTFOLIO",

    images: [
      {
        url: "/images/about/JM_Profile.png",
        width: 1200,
        height: 630,
        alt: "John Mike Martin Profile",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "JM MARTIN | PORTFOLIO",

    description:
      "Web Development, Mobile Applications, Databases, and AI Automation.",

    images: ["/images/about/JM_Profile.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
