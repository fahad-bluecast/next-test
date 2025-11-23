import Login from "@/components/login/Login";
export const metadata = {
  title: "Login",
  description:
    "Secure login to access your exam preparation dashboard and track your progress",
  robots: {
    index: false,
    follow: false,
  },
};
const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
