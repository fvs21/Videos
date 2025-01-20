/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/styles/variables';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  textNumber: string
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];
  const color = theme == 'light' ? 'black' : 'white';

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][color + textNumber as keyof typeof Colors[typeof theme]];
  }
}
