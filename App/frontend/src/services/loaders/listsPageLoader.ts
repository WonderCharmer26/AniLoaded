import type { QueryClient } from "@tanstack/react-query";
import { getUserTopLists } from "../api/userListsService";

export function listsPageLoader(queryClient: QueryClient, userId: string) {
  return async () => {
    await queryClient.ensureQueryData({
      queryKey: ["userTopLists", userId],
      queryFn: () => getUserTopLists(userId),
    });
    return null;
  };
}
