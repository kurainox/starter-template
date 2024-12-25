import "./globals.css";
// import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { openSans } from "@/global/fonts";
import "./material-symbols.css";
import ReactQueryProvider from "@/contexts/QueryContext";
// export const metadata = {
//   title: "starter-template",
//   description: "",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&&icon_names=add,arrow_drop_down,border_color,cancel,check_circle,collections_bookmark,diversity_3,edit,event,group,groups_3,mail,package_2,palette,password,progress_activity,settings,store,verified,visibility,visibility_off"
        />
      </head>
      <body className={`${openSans.className}`}>
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
