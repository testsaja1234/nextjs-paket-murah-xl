import { AuthService } from "./_auth.service";
import { PackageService } from "./_package.service";
import { TransactionService } from "./_transaction.service";

export const authService = new AuthService("http://127.0.0.1:8000");
export const transactionService = new TransactionService(
  "http://127.0.0.1:8000/v1"
);
export const packageService = new PackageService("http://127.0.0.1:8000/v1");
