import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginModal from "../components/LoginModal";
import { AuthProvider } from "../components/AuthProvider";


export default {
    title: "Components/LoginModal",
    component: LoginModal,
};

const queryClient = new QueryClient();

export const Modal = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LoginModal isOpen={true} />
    </AuthProvider>
  </QueryClientProvider>
);

