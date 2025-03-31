//////////////////////////////////////////////////////////////////////////////////////////
//   _  _ ____ _  _ ___  ____                                                           //
//   |_/  |__| |\ | |  \ |  |    This file belongs to Kando, the cross-platform         //
//   | \_ |  | | \| |__/ |__|    pie menu. Read more on github.com/kando-menu/kando     //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: Simon Schneegans <code@simonschneegans.de>
// SPDX-FileCopyrightText: Kevin Langman <klangman@gmail.com>
// SPDX-License-Identifier: MIT

'use strict';

const Cinnamon = imports.gi.Cinnamon;
const Meta = imports.gi.Meta;
const GObject = imports.gi.GObject;
const Main = imports.ui.main;

const KANDO_PREFIX = "kando-";

//////////////////////////////////////////////////////////////////////////////////////////
// This class can be used to bind a function to global hot keys. It's designed in the   //
// following way: An  arbitrary number of shortcuts can be registered. If one of the    //
// shortcuts is pressed, the "activated" signal will be executed. The pressed shortcut  //
// is passed as a parameter to the callback.                                            //
//////////////////////////////////////////////////////////////////////////////////////////

var Shortcuts = GObject.registerClass(

  // The object name has a random number to allow restarting the extension without
  // conflicting names which would cause errors the .xsession-errors.
  // Whenever one of the registered shortcuts is pressed, the "activated" callback
  // will be executed. The pressed shortcut is given as parameter.
  {
    GTypeName: `Cjs_Kando_Shortcuts_${Math.floor(Math.random() * 100000) + 1}`,
    Properties: {},
    Signals: {'activated': {param_types: [GObject.TYPE_STRING]}}
  },

  class Shortcuts extends GObject.Object {
    _init() {
      super._init();
      // Track all the installed shortcuts
      this._shortcuts = new Map();
      this._shortcutIdx = 0;
    }

    // Unbinds all registered shortcuts.
    destroy() {
      this.unbindAll();
    }

    // Register the given shortcut. When it's pressed, emit the "activated" signal
    bind(shortcut) {
      let ret = Main.keybindingManager.addHotKey(KANDO_PREFIX + this._shortcutIdx, shortcut, () => this.emit('activated', shortcut) );
      if (ret) {
         this._shortcuts.set(shortcut, this._shortcutIdx);
         this._shortcutIdx++;
      }
      return ret;
    }

    // remove a previously registered shortcut.
    unbind(shortcut) {
      const idx = this._shortcuts.get(shortcut);
      if (idx != undefined) {
         Main.keybindingManager.removeHotKey(KANDO_PREFIX + idx);
         this._shortcuts.delete(shortcut);
         return true;
      }
      return false;
    }

    // remove all the previously registered shortcuts.
    unbindAll() {
      for (let shortcut of this._shortcuts) {
        Main.keybindingManager.removeHotKey(KANDO_PREFIX + shortcut[1]);
      }
      this._shortcuts.clear();
      this._shortcutIdx = 0
    }
  });
