import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Table, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getMyOrders} from "@/sanity/queries";
import {auth} from "@clerk/nextjs/server";
import {FileX, PackageOpen} from "lucide-react";
import Link from "next/link";
import {redirect} from "next/navigation";
import React from "react";
import {Metadata} from "next";
import {getPageMetadata} from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata(
  "Order History",
  "orders",
  "View your order history and track your purchases at Electro"
);

const OrdersPage = async () => {
  const {userId} = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <Container className="py-12">
      {orders?.length ? (
        <Card className="w-full overflow-hidden border-gray-200 shadow-sm p-0">
          <CardHeader className="bg-gray-50 border py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl ">
                  <PackageOpen className="h-5 w-5 text-shop_dark_green" />
                  Order History
                </CardTitle>
                <CardDescription className="mt-1">
                  You have placed {orders.length} order
                  {orders.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-4 sm:mt-0 border-shop_dark_green text-shop_dark_green hover:bg-shop_dark_green hover:text-white">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-2">
            <ScrollArea className="w-full">
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="w-[100px] lg:w-auto font-medium">
                        Order #
                      </TableHead>
                      <TableHead className="hidden md:table-cell font-medium">
                        Date
                      </TableHead>
                      <TableHead className="font-medium">Customer</TableHead>
                      <TableHead className="hidden sm:table-cell font-medium">
                        Email
                      </TableHead>
                      <TableHead className="font-medium">Total</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="hidden sm:table-cell font-medium">
                        Invoice #
                      </TableHead>
                      <TableHead className="text-center font-medium">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center">
          <div className="bg-gray-50 p-6 rounded-full mb-6">
            <FileX className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No orders found
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            It looks like you haven&apos;t placed any orders yet. Start shopping
            to see your order history here!
          </p>
          <Button
            asChild
            className="bg-shop_dark_green hover:bg-shop_dark_green/90">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;
