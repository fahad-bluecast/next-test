import { UseLogout } from "@/api/logout/hook";
import Image from "next/image";
import { LoadingButton } from "../ui/LoadinButton";

const Navbar = () => {
  const { mutate: Logout, isPending } = UseLogout();
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 relative">
          {/* Logo - Centered */}
          <div className="flex items-center space-x-2">
            <Image
              src={"/Images/navbarImage.png"}
              alt="No image"
              width={190}
              height={60}
            />
          </div>

          {/* Logout Button - Absolute positioned to the right */}
          <div className="absolute right-0">
            <LoadingButton
              loading={isPending}
              onClick={() => Logout()}
              variant={"secondary"}
            >
              Logout
            </LoadingButton>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
