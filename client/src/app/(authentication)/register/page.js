import AuthWrapper from "@/containers/Auth/AuthWrapper";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense>
      <div>
        <AuthWrapper page={'register'} />
      </div>
    </Suspense>
  );
}
