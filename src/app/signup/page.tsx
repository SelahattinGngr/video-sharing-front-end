import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignupForm } from "@/components/forms/signup";
type Props = {};

export const metadata: Metadata = {};

export default async function SignupPage({}: Props) {
  return (
    <main className="min-h-screen">
      <div className="grid min-h-screen place-items-center">
        <Card className="w-full max-w-[450]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Already have an account?{" "}
              <Link className="link" href="/signin">
                Sign in
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter>
            <CardDescription>
              <Link className="link" href="/terms">
                Forgot your password?
              </Link>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
