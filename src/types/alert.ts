export type AlertType = "success" | "error" | "warning" | "info";

export type AlertButton = {
  label: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
};

export type AlertConfig = {
  type: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  actionText?: string;
  onAction?: () => void;
  dismissible?: boolean;
};
