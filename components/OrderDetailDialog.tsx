import {MY_ORDERS_QUERYResult} from "@/sanity.types";
import React from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "./ui/dialog";
import {Button} from "./ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";

interface OrderDetailsDialogProps {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Order #{order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        {/* Customer & Order Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 px-2">
          <div className="space-y-2">
            <p>
              <span className="font-medium">Customer:</span>{" "}
              <span className="text-gray-800">{order.customerName}</span>
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              <span className="text-gray-800">{order.email}</span>
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Date:</span>{" "}
              <span className="text-gray-800">
                {order.orderDate && new Date(order.orderDate).toUTCString()}
              </span>
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`capitalize font-semibold ${
                  order.status === "paid"
                    ? "text-green-600"
                    : order.status === "cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}>
                {order.status}
              </span>
            </p>
          </div>
          {order.invoice && (
            <div className="sm:col-span-2 flex items-center space-x-4 mt-2">
              <p className="font-medium">Invoice:</p>
              <span className="text-gray-800">#{order.invoice.number}</span>
              {order.invoice.hosted_invoice_url && (
                <Button variant="outline" className="text-sm hover:bg-gray-100">
                  <Link
                    href={order.invoice.hosted_invoice_url}
                    target="_blank"
                    className="block w-full h-full">
                    Download Invoice
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="mt-6 overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 shadow-sm">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wide text-gray-700">
                  Product
                </TableHead>
                <TableHead className="px-4 py-2 text-center text-sm font-medium uppercase tracking-wide text-gray-700">
                  Qty
                </TableHead>
                <TableHead className="px-4 py-2 text-right text-sm font-medium uppercase tracking-wide text-gray-700">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-100">
              {order.products?.map((item, idx) => (
                <TableRow
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="px-4 py-3 flex items-center gap-3">
                    {item.product?.images && (
                      <Image
                        src={urlFor(item.product.images[0]).url()}
                        alt={item?.product?.name || "Product image"}
                        width={48}
                        height={48}
                        className="rounded border"
                      />
                    )}
                    <span className="text-gray-900">{item.product?.name}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-gray-800">
                    <span className="px-2 py-1 bg-gray-100 rounded-md">
                      {item.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right text-gray-900 font-medium">
                    <PriceFormatter amount={item.product?.price} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 border-t pt-4 flex justify-end px-2">
          <div className="w-full max-w-xs space-y-3 text-gray-800">
            {order.amountDiscount !== 0 && (
              <div className="flex justify-between">
                <span>Discount</span>
                <PriceFormatter amount={order.amountDiscount} />
              </div>
            )}
            {order.amountDiscount !== 0 && (
              <div className="flex justify-between">
                <span>Subtotal</span>
                <PriceFormatter
                  amount={
                    (order.totalPrice as number) +
                    (order.amountDiscount as number)
                  }
                />
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <PriceFormatter amount={order.totalPrice} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
