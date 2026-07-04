"use server";

import { updateTag } from "next/cache";

export const logout = async () => {
  updateTag("current-user");
};
