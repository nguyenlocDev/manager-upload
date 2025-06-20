/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountTable } from "@/models/manager/account-table";

const ManagerPage = () => {
  return (
    <div>
      <div className="text-xl font-semibold mb-3">
        <h1>Quản Lý Tài Khoản</h1>
      </div>
      <AccountTable></AccountTable>
    </div>
  );
};

export default ManagerPage;
