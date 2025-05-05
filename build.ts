#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env
import {
  CatppuccinFlavor,
  flavorEntries,
  flavors,
} from "https://deno.land/x/catppuccin@v1.7.1/mod.ts";
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
  accent: string,
  flavor: CatppuccinFlavor,
) {
  let themeAccent: string = "";
  flavor.colorEntries.map(([colorName, { hex }]) => {
    if (colorName == accent) {
      themeAccent = hex;
    }
  });
  const palette = flavor.colors;
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
      colors: {
        frame: palette.base.hex,
        button_background_active: themeAccent,
        button_background_hover: palette.surface0.hex,
        icons: palette.text.hex,
        tab_text: palette.text.hex,
        tab_line: themeAccent,
        tab_loading: themeAccent,
        tab_selected: palette.base.hex,
        tab_background_text: palette.overlay1.hex,
        tab_background_separator: palette.surface0.hex,
        bookmark_text: palette.text.hex,
        toolbar: palette.base.hex,
        toolbar_field: palette.surface0.hex,
        toolbar_field_text: palette.text.hex,
        toolbar_field_highlight: themeAccent,
        toolbar_field_highlight_text: palette.mantle.hex,
        toolbar_field_border: palette.mantle.hex,
        toolbar_field_focus: palette.surface0.hex,
        toolbar_field_text_focus: palette.text.hex,
        toolbar_field_border_focus: themeAccent,
        toolbar_top_separator: palette.surface0.hex,
        toolbar_bottom_separator: palette.surface0.hex,
        toolbar_vertical_separator: palette.surface0.hex,
        sidebar: palette.base.hex,
        sidebar_text: palette.text.hex,
        sidebar_highlight: themeAccent,
        sidebar_highlight_text: palette.mantle.hex,
        sidebar_border: palette.surface0.hex,
        popup: palette.surface0.hex,
        popup_text: palette.text.hex,
        popup_border: palette.base.hex,
        popup_highlight: themeAccent,
        popup_highlight_text: palette.mantle.hex,
        spaces_bg: palette.mantle.hex,
        tree_view_bg: palette.crust.hex,
        bg_color: palette.base.hex,
        spaces_bg_active: themeAccent,
        button_primary_bg: themeAccent,
        button_text: palette.crust.hex,
        spaces_button: palette.crust.hex,
        tree_pane_bg: palette.crust.hex,
        tree_card_bg: palette.mantle.hex,
        layout_bg_0: palette.base.hex,
        layout_bg_1: palette.base.hex,
        button_bg: palette.mantle.hex,
        lwt_accent_color: palette.mantle.hex,
        list_container_background_selected_current: palette.mantle.hex,
        ab_cards_list_bg: palette.mantle.hex,
        in_content_box_info_background: palette.mantle.hex,
        calendar_view_toggle_bg: palette.mantle.hex,
        calendar_view_toggle_hover_bg: palette.surface0.hex,
        tabs_toolbar_bg: palette.mantle.hex,
        color_gray_70: palette.mantle.hex,
        color_gray_50: palette.surface1.hex,
      },
    },
  };
}

async function makeDarkLightThemeObject(
  name: string,
  accent: string,
  flavor: CatppuccinFlavor,
) {
  let lightAccent: string = "";
  let darkAccent: string = "";

  if (flavor.dark) {
    flavor.colorEntries.map(([colorName, { hex }]) => {
      if (colorName == accent) {
        darkAccent = hex;
      }
    });
    flavors.latte.colorEntries.map(([colorName, { hex }]) => {
      if (colorName == accent) {
        lightAccent = hex;
      }
    });
  } else return NaN;

  const palette = flavor.colors;
  const lightPalette = flavors.latte.colors;
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
    description: `Soothing pastel theme for Thunderbird - Latte and ${
      titleCase(name)
    } ${titleCase(accent)}`,
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
      colors: {
        frame: lightPalette.base.hex,
        button_background_active: lightAccent,
        button_background_hover: lightPalette.surface0.hex,
        icons: lightPalette.text.hex,
        tab_text: lightPalette.text.hex,
        tab_line: lightAccent,
        tab_loading: lightAccent,
        tab_selected: lightPalette.base.hex,
        tab_background_text: lightPalette.overlay1.hex,
        tab_background_separator: lightPalette.surface0.hex,
        bookmark_text: lightPalette.text.hex,
        toolbar: lightPalette.base.hex,
        toolbar_field: lightPalette.surface0.hex,
        toolbar_field_text: lightPalette.text.hex,
        toolbar_field_highlight: lightAccent,
        toolbar_field_highlight_text: lightPalette.mantle.hex,
        toolbar_field_border: lightPalette.mantle.hex,
        toolbar_field_focus: lightPalette.surface0.hex,
        toolbar_field_text_focus: lightPalette.text.hex,
        toolbar_field_border_focus: lightAccent,
        toolbar_top_separator: lightPalette.surface0.hex,
        toolbar_bottom_separator: lightPalette.surface0.hex,
        toolbar_vertical_separator: lightPalette.surface0.hex,
        sidebar: lightPalette.base.hex,
        sidebar_text: lightPalette.text.hex,
        sidebar_highlight: lightAccent,
        sidebar_highlight_text: lightPalette.mantle.hex,
        sidebar_border: lightPalette.surface0.hex,
        popup: lightPalette.surface0.hex,
        popup_text: lightPalette.text.hex,
        popup_border: lightPalette.base.hex,
        popup_highlight: lightAccent,
        popup_highlight_text: lightPalette.mantle.hex,
        spaces_bg: lightPalette.mantle.hex,
        tree_view_bg: lightPalette.crust.hex,
        bg_color: lightPalette.base.hex,
        spaces_bg_active: lightAccent,
        button_primary_bg: lightAccent,
        button_text: lightPalette.crust.hex,
        spaces_button: lightPalette.crust.hex,
        tree_pane_bg: lightPalette.crust.hex,
        tree_card_bg: lightPalette.mantle.hex,
        layout_bg_0: lightPalette.base.hex,
        layout_bg_1: lightPalette.base.hex,
        button_bg: lightPalette.mantle.hex,
        lwt_accent_color: lightPalette.mantle.hex,
        list_container_background_selected_current: lightPalette.mantle.hex,
        ab_cards_list_bg: lightPalette.mantle.hex,
        in_content_box_info_background: lightPalette.mantle.hex,
        calendar_view_toggle_bg: lightPalette.mantle.hex,
        calendar_view_toggle_hover_bg: lightPalette.surface0.hex,
        tabs_toolbar_bg: lightPalette.mantle.hex,
        color_gray_70: lightPalette.mantle.hex,
        color_gray_50: lightPalette.surface1.hex,
      },
    },
    dark_theme: {
      colors: {
        frame: palette.base.hex,
        button_background_active: darkAccent,
        button_background_hover: palette.surface0.hex,
        icons: palette.text.hex,
        tab_text: palette.text.hex,
        tab_line: darkAccent,
        tab_loading: darkAccent,
        tab_selected: palette.base.hex,
        tab_background_text: palette.overlay1.hex,
        tab_background_separator: palette.surface0.hex,
        bookmark_text: palette.text.hex,
        toolbar: palette.base.hex,
        toolbar_field: palette.surface0.hex,
        toolbar_field_text: palette.text.hex,
        toolbar_field_highlight: darkAccent,
        toolbar_field_highlight_text: palette.mantle.hex,
        toolbar_field_border: palette.mantle.hex,
        toolbar_field_focus: palette.surface0.hex,
        toolbar_field_text_focus: palette.text.hex,
        toolbar_field_border_focus: darkAccent,
        toolbar_top_separator: palette.surface0.hex,
        toolbar_bottom_separator: palette.surface0.hex,
        toolbar_vertical_separator: palette.surface0.hex,
        sidebar: palette.base.hex,
        sidebar_text: palette.text.hex,
        sidebar_highlight: darkAccent,
        sidebar_highlight_text: palette.mantle.hex,
        sidebar_border: palette.surface0.hex,
        popup: palette.surface0.hex,
        popup_text: palette.text.hex,
        popup_border: palette.base.hex,
        popup_highlight: darkAccent,
        popup_highlight_text: palette.mantle.hex,
        spaces_bg: palette.mantle.hex,
        tree_view_bg: palette.crust.hex,
        bg_color: palette.base.hex,
        spaces_bg_active: darkAccent,
        button_primary_bg: darkAccent,
        button_text: palette.crust.hex,
        spaces_button: palette.crust.hex,
        tree_pane_bg: palette.crust.hex,
        tree_card_bg: palette.mantle.hex,
        layout_bg_0: palette.base.hex,
        layout_bg_1: palette.base.hex,
        button_bg: palette.mantle.hex,
        lwt_accent_color: palette.mantle.hex,
        list_container_background_selected_current: palette.mantle.hex,
        ab_cards_list_bg: palette.mantle.hex,
        in_content_box_info_background: palette.mantle.hex,
        calendar_view_toggle_bg: palette.mantle.hex,
        calendar_view_toggle_hover_bg: palette.surface0.hex,
        tabs_toolbar_bg: palette.mantle.hex,
        color_gray_70: palette.mantle.hex,
        color_gray_50: palette.surface1.hex,
      },
    },
  };
}

async function generateVariants(
  name: string,
  flavor: CatppuccinFlavor,
) {
  for (const accent of accents) {
    const theme = await makeThemeObject(name, accent, flavor);
    const darkLightTheme = await makeDarkLightThemeObject(name, accent, flavor);
    const fileName = `${name}-${accent}.xpi`;
    writeTheme(fileName, theme, `./themes/${name}`);
    writeTheme(fileName, darkLightTheme, `./themes/dark-light/${name}`);
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
