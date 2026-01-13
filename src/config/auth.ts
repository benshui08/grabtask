export type AuthProvider = {
  id: string;
  name: string;
  enabled: boolean;
  icon: "google" | "facebook" | "apple";
};

export const authProviders: AuthProvider[] = [
  {
    id: "google",
    name: "Google",
    enabled: true,
    icon: "google",
  },
  {
    id: "facebook",
    name: "Facebook",
    enabled: false,
    icon: "facebook",
  },
  {
    id: "apple",
    name: "Apple",
    enabled: false,
    icon: "apple",
  },
];