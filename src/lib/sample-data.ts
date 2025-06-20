import type { Account, Invoice, PlayHistory, Prize } from "@/types/account";

export const accounts: Account[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    phone: "0569656796",
  },
  {
    id: "a1",
    name: "0569708107",
    phone: "0569708107",
  },
  {
    id: "a2",
    name: "0569615698",
    phone: "0569615698",
  },
  {
    id: "a3",
    name: "0569710806",
    phone: "0569710806",
  },
  {
    id: "a4",
    name: "0569629741",
    phone: "0569629741",
  },
  {
    id: "a5",
    name: "0569627249",
    phone: "0569627249",
  },
  {
    id: "a6",
    name: "0569557747",
    phone: "0569557747",
  },
  {
    id: "a7",
    name: "0569558481",
    phone: "0569558481",
  },
  {
    id: "a8",
    name: "0569616065",
    phone: "0569616065",
  },
  {
    id: "a9",
    name: "0569558526",
    phone: "0569558526",
  },
  {
    id: "a10",
    name: "0569661780",
    phone: "0569661780",
  },
  {
    id: "a11",
    name: "0569661793",
    phone: "0569661793",
  },
  {
    id: "a12",
    name: "0569661795",
    phone: "0569661795",
  },
  {
    id: "a13",
    name: "0569661791",
    phone: "0569661791",
  },
  {
    id: "a14",
    name: "0569558529",
    phone: "0569558529",
  },
  {
    id: "a15",
    name: "0569586676",
    phone: "0569586676",
  },
  {
    id: "a16",
    name: "0569559438",
    phone: "0569559438",
  },
  {
    id: "1c",
    name: "Dat",
    phone: "0362702163",
  },
  {
    id: "1cf",
    name: "ngan",
    phone: "0901376304",
  },
  {
    id: "1cfa",
    name: "ngan",
    phone: "0569656796",
  },
  {
    id: "22",
    name: "Lê Văn Long",
    phone: "0788029059",
  },
  {
    id: "24",
    name: "Lê Văn Long",
    phone: "0774374270",
  },
  {
    id: "25",
    name: "Lê Văn Long",
    phone: "0774394407",
  },
  {
    id: "26",
    name: "Lê Văn Long",
    phone: "0787184595",
  },
  {
    id: "2",
    name: "Lê Văn Long",
    phone: "0787427120",
  },
  {
    id: "3",
    name: "Lê Văn Long",
    phone: "0789059729",
  },
  {
    id: "4",
    name: "Lê Văn Long",
    phone: "0779269423",
  },
  {
    id: "5",
    name: "Lê Văn Long",
    phone: "0932284450",
  },
  {
    id: "6",
    name: "Lê Văn Long",
    phone: "0931696421",
  },
  {
    id: "7",
    name: "Lê Văn Long",
    phone: "0932278791",
  },
  {
    id: "8",
    name: "Lê Văn Long",
    phone: "0904876025",
  },
  {
    id: "9",
    name: "Lê Văn Long",
    phone: "0901784434",
  },
];

export const samplePrizes: Prize[] = [
  {
    date: "10/05/2025",
    prize: "Voucher 50.000đ",
    status: "Đã nhận",
  },
  {
    date: "15/04/2025",
    prize: "Voucher 100.000đ",
    status: "Đã nhận",
  },
];

export const sampleInvoices: Invoice[] = [
  {
    date: "18/05/2025",
    amount: "250.000đ",
    status: "Hợp lệ",
  },
  {
    date: "05/05/2025",
    amount: "120.000đ",
    status: "Hợp lệ",
  },
];

export const samplePlayHistory: PlayHistory[] = [
  {
    date: "19/05/2025",
    invoiceId: "HD001",
    result: "Không trúng",
  },
  {
    date: "18/05/2025",
    invoiceId: "HD002",
    result: "Trúng thưởng",
  },
  {
    date: "15/05/2025",
    invoiceId: "HD003",
    result: "Không trúng",
  },
];
