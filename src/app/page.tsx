import { ReactElement } from "react";
import { redirect } from "next/navigation";

export default function HomePage(): ReactElement {
  redirect("/dashboard/main");
}
