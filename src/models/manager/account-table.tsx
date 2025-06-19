/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import { Camera, FileText, Gift, MoreHorizontal, Receipt } from "lucide-react";

import type { Account } from "@/types/account";
import { accounts } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadDialog } from "@/models/dialogs/upload-dialog";
import { PrizeHistoryDialog } from "@/models/dialogs/prize-history-dialog";
import { InvoiceDialog } from "@/models/dialogs/invoice-dialog";
import { PlayListDialog } from "@/models/dialogs/play-list-dialog";

export function AccountTable() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);

  // Dialog states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [prizeHistoryDialogOpen, setPrizeHistoryDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [playListDialogOpen, setPlayListDialogOpen] = useState(false);

  // Xử lý chọn tất cả
  const toggleSelectAll = () => {
    if (selectedAccounts.length === accounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(accounts.map((account: any) => account.id));
    }
  };

  // Xử lý chọn một tài khoản
  const toggleSelectAccount = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAccounts.includes(id)) {
      setSelectedAccounts(
        selectedAccounts.filter((accountId) => accountId !== id)
      );
    } else {
      setSelectedAccounts([...selectedAccounts, id]);
    }
  };

  // Xử lý khi nhấn vào hàng
  const handleRowClick = (account: Account) => {
    setActiveAccount(account);
    setPlayListDialogOpen(true);
  };

  // Xử lý khi nhấn vào nút chức năng
  const handleUploadClick = (account: Account, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAccount(account);
    setUploadDialogOpen(true);
  };

  const handlePrizeHistoryClick = (account: Account, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAccount(account);
    setPrizeHistoryDialogOpen(true);
  };

  const handleInvoiceClick = (account: Account, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAccount(account);
    setInvoiceDialogOpen(true);
  };

  return (
    <div className="w-full">
      <div className="mt-4 mb-4">
        <p className="text-sm text-muted-foreground">
          Đã chọn {selectedAccounts.length} / {accounts.length} tài khoản
        </p>
      </div>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedAccounts.length === accounts.length &&
                    accounts.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Chọn tất cả"
                />
              </TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Tên tài khoản</TableHead>
              <TableHead className="text-right">Chức năng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account: any) => (
              <TableRow
                key={account.id}
                onClick={() => handleRowClick(account)}
                className="cursor-pointer"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedAccounts.includes(account.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAccounts([...selectedAccounts, account.id]);
                      } else {
                        setSelectedAccounts(
                          selectedAccounts.filter((id) => id !== account.id)
                        );
                      }
                    }}
                    onClick={(e) => toggleSelectAccount(account.id, e)}
                    aria-label={`Chọn tài khoản ${account.name}`}
                  />
                </TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Chụp hóa đơn"
                      onClick={(e) => handleUploadClick(account, e)}
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Chụp hóa đơn</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Xem lịch sử trúng thưởng"
                      onClick={(e) => handlePrizeHistoryClick(account, e)}
                    >
                      <Gift className="h-4 w-4" />
                      <span className="sr-only">Xem lịch sử trúng thưởng</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      title="Xem hóa đơn đã chụp"
                      onClick={(e) => handleInvoiceClick(account, e)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Xem hóa đơn đã chụp</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveAccount(account);
                            setUploadDialogOpen(true);
                          }}
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          <span>Chụp hóa đơn</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveAccount(account);
                            setPrizeHistoryDialogOpen(true);
                          }}
                        >
                          <Gift className="mr-2 h-4 w-4" />
                          <span>Xem lịch sử trúng thưởng</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveAccount(account);
                            setInvoiceDialogOpen(true);
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Xem hóa đơn đã chụp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setActiveAccount(account);
                            setPlayListDialogOpen(true);
                          }}
                        >
                          <Receipt className="mr-2 h-4 w-4" />
                          <span>Danh sách lượt chơi</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Các dialog */}
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        account={activeAccount}
      />
      <PrizeHistoryDialog
        open={prizeHistoryDialogOpen}
        onOpenChange={setPrizeHistoryDialogOpen}
        account={activeAccount}
      />
      <InvoiceDialog
        open={invoiceDialogOpen}
        onOpenChange={setInvoiceDialogOpen}
        account={activeAccount}
      />
      <PlayListDialog
        open={playListDialogOpen}
        onOpenChange={setPlayListDialogOpen}
        account={activeAccount}
      />
    </div>
  );
}
