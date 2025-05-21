"use client";

import {MY_ORDERS_QUERYResult} from "@/sanity.types";
import {TableBody, TableCell, TableRow} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import {format} from "date-fns";
import {useState} from "react";
import OrderDetailDialog from "./OrderDetailDialog";
import {Badge} from "./ui/badge";
import {Eye} from "lucide-react";
import {Button} from "./ui/button";

const OrdersComponent = ({orders}: {orders: MY_ORDERS_QUERYResult}) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <TableRow
              key={order?.orderNumber}
              className="transition-colors hover:bg-gray-50 h-14">
              <TableCell className="font-medium">
                <span className="font-mono">
                  {order.orderNumber?.slice(-10) ?? "N/A"}
                </span>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order?.orderDate &&
                  format(new Date(order.orderDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {order.email}
              </TableCell>
              <TableCell>
                <PriceFormatter
                  amount={order?.totalPrice}
                  className="text-black font-medium"
                />
              </TableCell>
              <TableCell>
                {order?.status && (
                  <Badge
                    className={`${
                      order.status === "paid"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}>
                    {order?.status.charAt(0).toUpperCase() +
                      order?.status.slice(1)}
                  </Badge>
                )}
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                {order?.invoice && (
                  <p className="font-mono text-sm line-clamp-1">
                    {order?.invoice ? order?.invoice?.number : "----"}
                  </p>
                )}
              </TableCell>
              <TableCell className="text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500 hover:text-shop_dark_green hover:bg-shop_dark_green/10 rounded-full"
                        onClick={() => setSelectedOrder(order)}>
                        <Eye size={16} />
                        <span className="sr-only">View order details</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View order details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
