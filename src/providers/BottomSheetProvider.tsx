 
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "react-native";

type BottomSheetContextType = {
  show: (content: React.ReactNode, snapPoints?: (string | number)[]) => void;
  hide: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx)
    throw new Error("useBottomSheet must be used inside BottomSheetProvider");
  return ctx;
};

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetContent, setSheetContent] = useState<React.ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<(string | number)[]>(["50%"]);

  const show = useCallback(
    (content: React.ReactNode, customSnapPoints?: (string | number)[]) => {
      setSheetContent(content);
      setSnapPoints(customSnapPoints || ["50%"]);
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 0);
    },
    [],
  );

  const hide = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        // backgroundStyle={{ backgroundColor: currentTheme.dialogueBg }}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose
      >
        <View style={{ flex: 1 }}>{sheetContent}</View>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};
