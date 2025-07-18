import "./globals.css";
import Header from "@/containers/Header/Header";
import { AuthProvider } from "@/context/authContext";
import { TasksProvider } from "@/context/tasksContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Task Manager",
  description: "Manage your task correctly",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <AuthProvider>
        <TasksProvider>
          <body>
            <Header />
            {children}
          </body>
      </TasksProvider>
      </AuthProvider>
    </html>
  );
}
