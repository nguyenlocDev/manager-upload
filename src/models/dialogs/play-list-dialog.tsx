import type { Account } from "@/types/account";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { samplePlayHistory } from "@/lib/sample-data";

interface PlayListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

export function PlayListDialog({
  open,
  onOpenChange,
  account,
}: PlayListDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Danh sách lượt chơi</DialogTitle>
          <DialogDescription>
            {account ? `Tài khoản: ${account.name} (${account.phone})` : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Hóa đơn</TableHead>
                  <TableHead>Kết quả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samplePlayHistory.map((play, index) => (
                  <TableRow key={index}>
                    <TableCell>{play.date}</TableCell>
                    <TableCell>{play.invoiceId}</TableCell>
                    <TableCell>{play.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
