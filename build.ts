#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env
import {
  AccentName,
  CatppuccinFlavor,
  flavorEntries,
  flavors,
} from "jsr:@catppuccin/palette@1.7.1";
import { titleCase } from "https://deno.land/x/case@2.2.0/mod.ts";
import { JSZip } from "https://deno.land/x/jszip@0.11.0/mod.ts";
import * as uuid from "https://deno.land/std@0.207.0/uuid/mod.ts";

// Allows for the UUIDs to be "seeded" and therefore reproducible
// DO NOT CHANGE
const NAMESPACE_URL = "6da2d448-69ec-48e0-aabf-3c6379788110";

const accents = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
] as const;

async function makeThemeObject(
  name: string,
  accent: AccentName,
  palette: CatppuccinFlavor,
  autoTheme: boolean,
) {
  const darkColors = await getColors(accent, palette);
  let lightColors = await getColors(accent, palette);
  let colorScheme = "dark";

  if (!palette.dark) {
    colorScheme = "light";
  }

  if (autoTheme) {
    if (palette.name == flavors.latte.name) {
      return null;
    }
    lightColors = await getColors(accent, flavors.latte);
    colorScheme = "auto";
  }

  const themeName = `catppuccin-${name}-${accent}`;
  const encodedName = new TextEncoder().encode(themeName);
  return {
    manifest_version: 2,
    name: themeName,
    version: "1.0.0",
    applications: {
      gecko: {
        id: `{${await uuid.v5.generate(NAMESPACE_URL, encodedName)}}`,
        strict_min_version: "60.0",
      },
    },
    description: `Soothing pastel theme for Thunderbird - ${titleCase(name)} ${
      titleCase(accent)
    }`,
    icons: {
      "16": "images/icon16.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png",
    },
    theme_experiment: {
      stylesheet: "styles.css",
      colors: {
        spaces_bg: "--spaces-bg-color",
        spaces_bg_active: "--spaces-button-active-bg-color",
        spaces_button: "--spaces-button-active-text-color",
        tree_view_bg: "--tree-view-bg",
        bg_color: "--bg-color",
        button_primary_bg: "--button-primary-background-color",
        button_text: "--button-primary-text-color",
        tree_pane_bg: "--tree-pane-background",
        tree_card_bg: "--tree-card-background",
        layout_bg_0: "--layout-background-0",
        layout_bg_1: "--layout-background-1",
        button_bg: "--button-background-color",
        lwt_accent_color: "--lwt-accent-color",
        list_container_background_selected_current:
          "--list-container-background-selected-current",
        ab_cards_list_bg: "--ab-cards-list-bg",
        in_content_box_info_background: "--in-content-box-info-background",
        calendar_view_toggle_bg: "--calendar-view-toggle-background",
        calendar_view_toggle_hover_bg:
          "--calendar-view-toggle-hover-background",
        tabs_toolbar_bg: "--tabs-toolbar-background-color",
        color_gray_70: "--color-gray-70",
        color_gray_50: "--color-gray-50",
      },
    },
    theme: {
      colors: lightColors,
      properties: {
        color_scheme: colorScheme,
      },
    },
    dark_theme: {
      colors: darkColors,
      properties: {
        color_scheme: colorScheme,
      },
    },
  };
}

async function getColors(
  accent: AccentName,
  palette: CatppuccinFlavor,
) {
  return {
    frame: palette.colors.base.hex,
    button_background_active: palette.colors[accent].hex,
    button_background_hover: palette.colors.surface0.hex,
    icons: palette.colors.text.hex,
    tab_text: palette.colors.text.hex,
    tab_line: palette.colors[accent].hex,
    tab_loading: palette.colors[accent].hex,
    tab_selected: palette.colors.base.hex,
    tab_background_text: palette.colors.overlay1.hex,
    tab_background_separator: palette.colors.surface0.hex,
    bookmark_text: palette.colors.text.hex,
    toolbar: palette.colors.base.hex,
    toolbar_field: palette.colors.surface0.hex,
    toolbar_field_text: palette.colors.text.hex,
    toolbar_field_highlight: palette.colors[accent].hex,
    toolbar_field_highlight_text: palette.colors.mantle.hex,
    toolbar_field_border: palette.colors.mantle.hex,
    toolbar_field_focus: palette.colors.surface0.hex,
    toolbar_field_text_focus: palette.colors.text.hex,
    toolbar_field_border_focus: palette.colors[accent].hex,
    toolbar_top_separator: palette.colors.surface0.hex,
    toolbar_bottom_separator: palette.colors.surface0.hex,
    toolbar_vertical_separator: palette.colors.surface0.hex,
    sidebar: palette.colors.base.hex,
    sidebar_text: palette.colors.text.hex,
    sidebar_highlight: palette.colors[accent].hex,
    sidebar_highlight_text: palette.colors.mantle.hex,
    sidebar_border: palette.colors.surface0.hex,
    popup: palette.colors.surface0.hex,
    popup_text: palette.colors.text.hex,
    popup_border: palette.colors.base.hex,
    popup_highlight: palette.colors[accent].hex,
    popup_highlight_text: palette.colors.mantle.hex,
    spaces_bg: palette.colors.mantle.hex,
    tree_view_bg: palette.colors.crust.hex,
    bg_color: palette.colors.base.hex,
    spaces_bg_active: palette.colors[accent].hex,
    button_primary_bg: palette.colors[accent].hex,
    button_text: palette.colors.crust.hex,
    spaces_button: palette.colors.crust.hex,
    tree_pane_bg: palette.colors.crust.hex,
    tree_card_bg: palette.colors.mantle.hex,
    layout_bg_0: palette.colors.base.hex,
    layout_bg_1: palette.colors.base.hex,
    button_bg: palette.colors.mantle.hex,
    lwt_accent_color: palette.colors.mantle.hex,
    list_container_background_selected_current: palette.colors.mantle.hex,
    ab_cards_list_bg: palette.colors.mantle.hex,
    in_content_box_info_background: palette.colors.mantle.hex,
    calendar_view_toggle_bg: palette.colors.mantle.hex,
    calendar_view_toggle_hover_bg: palette.colors.surface0.hex,
    tabs_toolbar_bg: palette.colors.mantle.hex,
    color_gray_70: palette.colors.mantle.hex,
    color_gray_50: palette.colors.surface1.hex,
  };
}

async function generateVariants(
  name: string,
  flavor: CatppuccinFlavor,
) {
  for (const accent of accents) {
    const theme = await makeThemeObject(name, accent, flavor, false);
    const autoTheme = await makeThemeObject(name, accent, flavor, true);
    const fileName = `${name}-${accent}.xpi`;
    writeTheme(fileName, theme, `./themes/default/${name}`);
    writeTheme(fileName, autoTheme, `./themes/auto/${name}`);
  }
}

async function writeTheme(
  fileName: string,
  theme: unknown,
  path: string,
) {
  if (theme) {
    const json = JSON.stringify(theme, undefined, 2);

    Deno.mkdirSync(`${path}`, {
      recursive: true,
    });

    const zip = new JSZip();
    zip.addFile("manifest.json", json);

    const images = zip.folder("images");
    images.addFile("icon16.png", "./assets/icon16.png");
    images.addFile("icon48.png", "./assets/icon48.png");
    images.addFile("icon128.png", "./assets/icon128.png");

    await zip.writeZip(`${path}/${fileName}`);
  }
}

const start = performance.now();
await Promise.all(
  flavorEntries.map(([name, flavor]) => generateVariants(name, flavor)),
);

console.log("Built in", performance.now() - start, "ms");
