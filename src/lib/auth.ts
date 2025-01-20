// Use this file to export all the auth related function from clerk
// This will help in importing all the auth related functions from a single file
// If in future we change the auth mechanic, we can change it here and it will reflect in all the files where it is imported

import { currentUser } from "@clerk/nextjs/server";

export { currentUser };
