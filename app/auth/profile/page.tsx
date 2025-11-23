import Profile from "@/components/profile/Profile";
export const metadata = {
  title: "My Profile",
  description: "Manage your profile and settings",
  robots: {
    index: false,
    follow: false,
  },
};
const page = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default page;
