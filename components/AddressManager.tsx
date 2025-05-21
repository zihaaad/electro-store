"use client";

import React, {useEffect, useState} from "react";
import {Address} from "@/sanity.types";
import {client} from "@/sanity/lib/client";
import {Button} from "./ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import {Label} from "./ui/label";
import {Input} from "./ui/input";
import {HomeIcon, MapPin, Plus, Trash} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {useUser} from "@clerk/nextjs";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
import {Checkbox} from "./ui/checkbox";
import toast from "react-hot-toast";
import {Badge} from "./ui/badge";

interface AddressManagerProps {
  className?: string;
  onAddressSelect?: (address: Address | null) => void;
  selectedAddress?: Address | null;
  compact?: boolean;
}

const AddressManager: React.FC<AddressManagerProps> = ({
  className = "",
  onAddressSelect,
  selectedAddress: externalSelectedAddress,
  compact = false,
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    externalSelectedAddress || null
  );
  const {user, isLoaded} = useUser();

  // Form state for new address
  const [addressName, setAddressName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    if (!user?.emailAddresses[0]?.emailAddress) return;

    setLoading(true);
    try {
      // Use the API endpoint instead of directly using client
      const email = user.emailAddresses[0].emailAddress;
      const response = await fetch(
        `/api/address?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await response.json();
      setAddresses(data.addresses);

      // If no address is selected, select the default or first one
      if (!selectedAddress) {
        const defaultAddress = data.addresses.find(
          (addr: Address) => addr.default
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
          onAddressSelect?.(defaultAddress);
        } else if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
          onAddressSelect?.(data.addresses[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchAddresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);

  useEffect(() => {
    if (externalSelectedAddress) {
      setSelectedAddress(externalSelectedAddress);
    }
  }, [externalSelectedAddress]);

  const validateForm = () => {
    if (!addressName || !street || !city || !state || !zip) {
      setFormError("Please fill in all fields");
      return false;
    }

    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      setFormError("Please enter a valid ZIP code (e.g. 12345 or 12345-6789)");
      return false;
    }

    if (state.length !== 2) {
      setFormError("State should be a 2-letter code (e.g. NY, CA)");
      return false;
    }

    setFormError(null);
    return true;
  };

  const handleAddAddress = async () => {
    if (!user?.emailAddresses[0]?.emailAddress) {
      toast.error("You must be logged in to add an address");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Use the API endpoint to create a new address
      const response = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: addressName,
          email: user.emailAddresses[0].emailAddress,
          address: street,
          city,
          state: state.toUpperCase(),
          zip,
          isDefault: isDefault,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      const data = await response.json();
      toast.success("Address added successfully!");
      setIsAddressDialogOpen(false);
      resetForm();

      // Refetch addresses
      await fetchAddresses();

      // Find the newly created address
      if (data.address) {
        // Fetch the full address details using client (read-only operation is fine)
        const query = `*[_type=="address" && _id == $id][0]`;
        const addedAddress = await client.fetch<Address>(query, {
          id: data.address._id,
        });

        if (addedAddress) {
          setSelectedAddress(addedAddress);
          onAddressSelect?.(addedAddress);
        }
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAddressName("");
    setStreet("");
    setCity("");
    setState("");
    setZip("");
    setIsDefault(false);
    setFormError(null);
  };

  const makeDefault = async (addressId: string) => {
    setLoading(true);
    try {
      // Use the API endpoint to update address
      const response = await fetch("/api/address", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId,
          isDefault: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update address");
      }

      toast.success("Default address updated");
      await fetchAddresses();
    } catch (error) {
      console.error("Error updating default address:", error);
      toast.error("Failed to update default address");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      // Use the API endpoint to delete address
      const response = await fetch(`/api/address?addressId=${addressId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      toast.success("Address deleted successfully");

      // If we deleted the selected address, clear the selection
      if (selectedAddress?._id === addressId) {
        setSelectedAddress(null);
        if (onAddressSelect) onAddressSelect(null);
      }

      await fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    onAddressSelect?.(address);
  };

  if (!isLoaded) {
    return <div className="animate-pulse h-20 bg-gray-100 rounded-md"></div>;
  }

  if (!user) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>Shipping Addresses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Please sign in to manage your shipping addresses.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader
          className={`flex flex-row items-center justify-between pb-2 ${compact ? "p-3" : ""}`}>
          <CardTitle
            className={`flex items-center gap-2 ${compact ? "text-base" : ""}`}>
            <MapPin className={compact ? "h-4 w-4" : "h-5 w-5"} />
            <span>Shipping Addresses</span>
          </CardTitle>
          <Button
            variant="outline"
            size={compact ? "sm" : "default"}
            onClick={() => setIsAddressDialogOpen(true)}
            disabled={loading}
            className="gap-1">
            <Plus className="h-4 w-4" />
            {compact ? "Add" : "Add Address"}
          </Button>
        </CardHeader>
        <CardContent className={compact ? "p-3 pt-0" : ""}>
          {loading && addresses.length === 0 ? (
            <div className="animate-pulse space-y-2">
              <div className="h-10 bg-gray-100 rounded-md"></div>
              <div className="h-10 bg-gray-100 rounded-md"></div>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-4">
              <HomeIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">
                You haven&apos;t added any addresses yet.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddressDialogOpen(true)}
                className="mt-1">
                Add Your First Address
              </Button>
            </div>
          ) : (
            <RadioGroup
              value={selectedAddress?._id}
              onValueChange={(value) => {
                const selected = addresses.find((addr) => addr._id === value);
                if (selected) handleAddressSelect(selected);
              }}
              className="space-y-2">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className={`
                    relative flex flex-col border p-3 rounded-md 
                    ${compact ? "p-2 text-sm" : ""}
                    ${
                      selectedAddress?._id === address._id
                        ? "border-shop_dark_green bg-shop_dark_green/5"
                        : "border-gray-200 hover:border-gray-300"
                    }
                    transition-colors cursor-pointer
                  `}
                  onClick={() => handleAddressSelect(address)}>
                  <div className="flex items-start gap-2">
                    <RadioGroupItem
                      value={address._id}
                      id={`address-${address._id}`}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <Label
                          htmlFor={`address-${address._id}`}
                          className={`font-semibold cursor-pointer ${compact ? "text-sm" : ""}`}>
                          {address.name}
                        </Label>
                        <div className="flex items-center gap-1">
                          {address.default && (
                            <Badge
                              variant="outline"
                              className="bg-shop_light_green/10 border-shop_light_green/30 text-shop_dark_green text-xs py-0">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p
                        className={`text-gray-600 ${compact ? "text-xs" : "text-sm"}`}>
                        {address.address}, {address.city}, {address.state}{" "}
                        {address.zip}
                      </p>
                    </div>
                  </div>

                  {!compact && (
                    <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
                      {!address.default && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            makeDefault(address._id);
                          }}
                          disabled={loading}
                          className="text-xs h-7 text-shop_dark_green hover:text-shop_dark_green hover:bg-shop_dark_green/10">
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(address._id);
                        }}
                        disabled={loading}
                        className="text-xs h-7 text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>
              Add a new shipping address to your account
            </DialogDescription>
          </DialogHeader>

          {formError && (
            <div className="bg-red-50 text-red-600 p-2 rounded text-sm mb-4">
              {formError}
            </div>
          )}

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="address-name">Address Name</Label>
              <Input
                id="address-name"
                placeholder="Home, Work, etc."
                value={addressName}
                onChange={(e) => setAddressName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="123 Main St, Apt 4"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State (2 letters)</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                placeholder="12345 or 12345-6789"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="default"
                checked={isDefault}
                onCheckedChange={(checked) => setIsDefault(checked === true)}
              />
              <Label
                htmlFor="default"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Set as default address
              </Label>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsAddressDialogOpen(false);
              }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddAddress}
              disabled={loading}
              className="bg-shop_dark_green hover:bg-shop_dark_green/90">
              {loading ? "Adding..." : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressManager;
