"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { loginAdmin } from "@/Server-actions/adminAuthenticate";
import { toast } from "sonner";

const formSchema = z.object({
  adminusername: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type AdminFormValues = z.infer<typeof formSchema>;

const AdminLoginPage: React.FC = () => {
  const router = useRouter();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminusername: "tandoorians",
      password: "password",
    },
  });

  const onSubmit = async (data: AdminFormValues) => {
    const toastId = toast.loading("Logging in", { position: "top-center" });
    try {
      const resp = await loginAdmin(data);
      console.log({ resp });
      if (!resp.status) {
        toast.error(resp.message, { id: toastId });
        return form.setError(resp.field, { message: resp.message });
      }
      toast.success(resp.message, {
        id: toastId,
        description: "Redirecting to admin page",
      });
      router.replace("/admin");
    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId,
        description: "Please try again",
      });
      console.log(error);
    }
  };

  const navigateToMenu = () => {
    router.push("/menu");
  };

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Restaurant Portal
            </CardTitle>
          </div>
          <CardDescription>
            Admin portal for restaurant management
          </CardDescription>
        </CardHeader>

        <CardContent className="p-2 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="adminusername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="admin"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      {/* <a
                        href="/forgot-password"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </a> */}
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>

          <Separator className="my-6" />

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Looking for our menu?
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={navigateToMenu}
            >
              View Menu as Customer
            </Button>
          </div>
        </CardContent>

        {/* <CardFooter className="flex flex-col space-y-4 border-t p-6">
          <div className="text-center text-xs text-gray-500">
            By logging in, you agree to our Terms of Service and Privacy Policy.
          </div>
          <div className="text-center text-xs">
            © {new Date().getFullYear()} Restaurant Management System
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default AdminLoginPage;
