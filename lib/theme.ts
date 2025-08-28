import { NAV_THEME } from "./constants";
import { useColorScheme } from "./useColorScheme";

export default function useTheme() {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    return theme;
}