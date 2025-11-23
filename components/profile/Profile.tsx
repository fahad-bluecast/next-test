import z from "zod";
import LeftSideImage from "../common/LeftSideImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "../ui/LoadinButton";
import { Form } from "../ui/form";
import FormInput from "../form/FormInput";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { usePhone } from "@/contexts/PhoneContext";
import { useAddProfileData } from "@/api/profile/hook";

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  qualification: z.string().min(1, "Qualification is required"),
  image: z
    .any()
    .refine((file) => file !== undefined && file !== null, {
      message: "Image is required",
    })
    .refine((file) => file instanceof File || file instanceof FileList, {
      message: "Please upload a valid image file",
    })
    // .refine(
    //   (file) => {
    //     if (file instanceof FileList) {
    //       return file.length > 0 && file[0].size <= 5 * 1024 * 1024;
    //     }
    //     return file.size <= 5 * 1024 * 1024;
    //   },
    //   {
    //     message: "Image size must be less than 5MB",
    //   }
    // )
    .refine(
      (file) => {
        if (!file) return false;
        if (file instanceof FileList) {
          return (
            file.length > 0 &&
            file[0] instanceof File &&
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              file[0].type
            )
          );
        }
        if (file instanceof File) {
          return [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ].includes(file.type);
        }
        return false;
      },
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      }
    ),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { phoneNumber } = usePhone();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      qualification: "",
      image: undefined,
    },
  });

  const { mutate: AddProfile, isPending } = useAddProfileData();

  const onSubmit = (data: ProfileFormValues) => {
    if (!phoneNumber) {
      form.setError("root", {
        message: "Phone number is missing. Please login again.",
      });
      return;
    }

    if (!data.image || !(data.image instanceof File)) {
      form.setError("image", {
        message: "Please upload a profile image",
      });
      return;
    }

    AddProfile({
      mobile: phoneNumber,
      name: data.name,
      email: data.email,
      qualification: data.qualification,
      profile_image: data.image,
    });
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", undefined);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };
  console.log(form.formState.errors, "fom");

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr] w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl shadow-2xl h-auto md:h-[500px]">
        <div className="hidden md:block">
          <LeftSideImage />
        </div>

        {/* Right Section - Form */}
        <div className="w-full p-3 sm:p-4 md:p-3 flex flex-col h-full min-h-0">
          <div className="bg-white h-full rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col w-full overflow-hidden">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-full flex flex-col"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1C3141] mb-4 shrink-0">
                  Add Your Details
                </h2>

                {/* Root Error Display */}
                {form.formState.errors.root && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">
                      {form.formState.errors.root.message}
                    </p>
                  </div>
                )}

                {/* Scrollable Fields Container */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 min-h-0 max-h-full">
                  <div className="space-y-4 pb-2">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative">
                        {imagePreview ? (
                          <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-slate-200">
                            <img
                              src={imagePreview}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition shadow-lg z-10"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="image-upload"
                            className="w-24 h-24 md:w-40 md:h-40 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition bg-white"
                          >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-slate-300 flex items-center justify-center mb-3">
                              <Upload className="w-6 h-6 text-slate-400" />
                            </div>
                            <span className="lg:text-sm text-xs text-slate-400 text-center px-2">
                              Add Your Profile picture
                            </span>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/jpeg,image/jpg,image/png,image/webp"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      {/* Image Error Display */}
                      {form.formState.errors.image && (
                        <p className="text-sm text-red-600 mt-2 text-center">
                          {form.formState.errors.image.message as string}
                        </p>
                      )}
                    </div>

                    {/* Name Field */}
                    <div className="relative">
                      <FormInput
                        name="name"
                        type="text"
                        label="Name"
                        placeholder="Enter your Full Name"
                        required={true}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your Email Address"
                        required
                      />
                    </div>

                    {/* Qualification Field */}
                    <div className="relative">
                      <FormInput
                        name="qualification"
                        type="text"
                        label="Your Qualification"
                        placeholder="Enter your Qualification"
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Fixed Submit Button at Bottom */}
                <div className="shrink-0 mt-4 pt-4 border-t border-slate-200">
                  <LoadingButton
                    type="submit"
                    loading={isPending}
                    className="w-full"
                  >
                    Get Started
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
