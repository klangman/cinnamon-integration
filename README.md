# cinnamon-integration

This Cinnamon extension is required for [🥧 Kando](https://github.com/kando-menu/kando) on Cinnamon under Wayland. Via a D-Bus interface, it provides the name of the currently focused window, and the current mouse pointer position. Furthermore, it allows registering and simulating keyboard shortcuts.

## ⬇️ Installation

### From the Cinnamon Extensions Application

Simply open Menu -> Preferences -> Extensions and select the Download tab.  Search for "Kando" and hit the ⬇ Install button beside "Kando Cinnamon Extension". Now return to the Manage tab, find the "Kando Cinnamon Integration" list entry and press the ➕ button to enable the extension. Now you can start Kando.

You can also find the "Kando Cinnamon Extension" on [cinnamon-spices.linuxmint.com](https://cinnamon-spices.linuxmint.com/) 

### From Source Code

To install the extension directly from the `main` branch on GitHub, clone this repository and run `make install`:

```shell
git clone https://github.com/kando-menu/cinnamon-integration.git
cd cinnamon-integration
make install
```

Afterwards, enable the extension using Menu -> Preferences -> Extensions, select the "Kando Cinnamon Integration" list entry and press the ➕ Enable button. Now you can start Kando.
