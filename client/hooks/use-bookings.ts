import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBookings, createBooking } from "@/lib/api";
import type { CreateBookingRequest } from "@/types/bookingSchema";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookingRequest) => createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
