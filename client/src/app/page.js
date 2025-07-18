import HomeWrapper from "@/containers/Home/HomeWrapper";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HomeWrapper />
    </Suspense>
  );
}
