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
import { samplePrizes } from "@/lib/sample-data";

interface PrizeHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

export function PrizeHistoryDialog({
  open,
  onOpenChange,
  account,
}: PrizeHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lịch sử trúng thưởng</DialogTitle>
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
                  <TableHead>Giải thưởng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samplePrizes.map((prize, index) => (
                  <TableRow key={index}>
                    <TableCell>{prize.date}</TableCell>
                    <TableCell>{prize.prize}</TableCell>
                    <TableCell>{prize.status}</TableCell>
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
