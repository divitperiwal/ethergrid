import toast from "react-hot-toast";

export const formatAddress = (address: string) => {
  if (!address) return;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      background: "linear-gradient(to right, #ef4444, #db2777, #6d28d9)", // red/purple gradient
      color: "#fff",
      borderRadius: "12px",
      padding: "12px 16px",
      fontWeight: "600",
    },
    icon: "❌",
  });
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      background: "linear-gradient(to right, #34d399, #10b981, #0d9488)",
      color: "#fff",
      borderRadius: "12px",
      padding: "12px 16px",
      fontWeight: "600",
    },
    icon: "✅",
  });
};
