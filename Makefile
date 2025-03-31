# SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
# SPDX-FileCopyrightText: Kevin Langman <klangman@gmail.com>
# SPDX-License-Identifier: MIT

SHELL := /bin/bash

# These five recipes can be invoked by the user.
.PHONY: install uninstall

# The install recipes creates the extension zip and installs it.
install:
	ln -s ${PWD}/KandoCinnamonIntegration@kando.menu ~/.local/share/cinnamon/extensions/KandoCinnamonIntegration@kando.menu
	@echo "Extension installed successfully! Now enable the extension using Menu->Preferences->Extensions."

# This uninstalls the previously installed extension.
uninstall:
	rm ~/.local/share/cinnamon/extensions/KandoCinnamonIntegration@kando.menu
