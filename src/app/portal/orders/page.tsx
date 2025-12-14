import { redirect } from "next/navigation";

export default function OrdersRedirectPage() {
  redirect("/portal/admin/orders");
}

