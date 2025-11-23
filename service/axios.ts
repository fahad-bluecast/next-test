import { LocalStorage } from "@/utility/localstorage";
import axios, { AxiosInstance } from "axios";

const BaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://nexlearn.noviindusdemosites.in";

export class Axios {
  private static instance: AxiosInstance;

  // Create or return the existing Axios instance
  static getInstance(): AxiosInstance {
    Axios.instance =
      Axios.instance ||
      axios.create({
        baseURL: BaseUrl,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

    // Intercepting request to add Authorization header
    Axios.instance.interceptors.request.use(
      (config) => {
        const pathname = window.location.pathname;

        // Don't add authorization header for specific paths like lead-generation

        // Get token from localStorage
        const UserToken = LocalStorage.getItem("accessToken");
        const { headers } = config;
        if (UserToken) {
          headers.Authorization = `Bearer ${UserToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Create a class to manage token refresh
    class TokenRefreshManager {
      private static isRefreshing = false;
      private static refreshSubscribers: ((token: string) => void)[] = [];

      static async refreshToken(refresh_token: string): Promise<string | null> {
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.refreshSubscribers.push((token: string) => {
              resolve(token);
            });
          });
        }

        this.isRefreshing = true;

        try {
          const tokenRefreshInstance = axios.create({
            baseURL: BaseUrl,
            headers: {
              "Content-Type": "application/json",
            },
          });

          //   const response = await tokenRefreshInstance.post(
          //     `/auth/loginWithRefreshToken`,
          //     {
          //       token: refresh_token,
          //     }
          //   );

          //   if (response.data.success) {
          //     const newAccessToken =
          //       response?.data?.payload?.loginResponse?.accessToken;
          //     const newRefreshToken =
          //       response?.data?.payload?.loginResponse?.refreshToken;
          //     const userRole = response.data.payload?.loginResponse?.userRole;

          //     LocalStorage.setItem("accessToken", newAccessToken);
          //     LocalStorage.setItem("refreshToken", newRefreshToken);
          //     LocalStorage.setItem("userRole", userRole);

          //     this.refreshSubscribers.forEach((callback) =>
          //       callback(newAccessToken)
          //     );
          //     this.refreshSubscribers = [];

          //     return newAccessToken;
          //   }
          return null;
        } catch {
          return null;
        } finally {
          this.isRefreshing = false;
        }
      }
    }

    // Intercepting response to handle token expiration
    Axios.instance.interceptors.response.use(
      (response) => {
        return response; // Return response if successful
      },
      async (error) => {
        const originalRequest = error.config;
        const pathname = window.location.pathname;

        // Check for 401 Unauthorized error
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Prevent retry loops
          const refresh_token = LocalStorage.getItem("refreshToken");

          if (!refresh_token) {
            console.error("No refresh token available.");
            LocalStorage.clear();
            window.location.href = "/login";
            return Promise.reject(error);
          }

          const newAccessToken = await TokenRefreshManager.refreshToken(
            refresh_token
          );

          if (newAccessToken) {
            // Update the Authorization header for future requests
            Axios.instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } else {
            // Only clear storage if refresh token is invalid
            LocalStorage.clear();
            window.location.href = "/login"; // Uncomment to redirect to login
            return Promise.reject(error);
          }
        }

        // For other errors, reject the promise
        return Promise.reject(error);
      }
    );

    return Axios.instance;
  }
}

// Exporting the axios instance to be used throughout the application
export const axiosInstance = Axios.getInstance();
