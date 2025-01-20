/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/styles/variables';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  textNumber: string
) {
  const theme = useColorScheme() ?? 'light';
  const color = theme == 'light' ? 'black' : 'white';

  return Colors[theme][color + textNumber as keyof typeof Colors[typeof theme]];
}
