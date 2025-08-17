import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddContactForm from "../components/AddContactForm";
import { AuthProvider } from "../components/AuthProvider";

export default {
  title: "Components/AddContactForm",
  component: AddContactForm,
};
const queryClient = new QueryClient();

export const Form = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AddContactForm />
    </AuthProvider>
  </QueryClientProvider>
);

