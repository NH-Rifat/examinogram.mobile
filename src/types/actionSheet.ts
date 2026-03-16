export type ActionSheetButton = {
  title: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
};

export type ActionSheetConfig = {
  title?: string;
  message?: string;
  buttons: ActionSheetButton[];
  cancelLabel?: string;
};
