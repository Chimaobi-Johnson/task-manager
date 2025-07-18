import AuthWrapper from "@/containers/Auth/AuthWrapper";
import { Suspense } from "react";

export default function Login() {
  return (
    <Suspense>
      <div>
        <AuthWrapper page={'login'} />
      </div>
    </Suspense>
  );
}
