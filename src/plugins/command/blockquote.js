/*
 * wysiwyg web editor
 *
 * suneditor.js
 * Copyright 2017 JiHong Lee.
 * MIT license.
 */
'use strict';

export default {
    name: 'blockquote',
    display: 'command',
    add: function (core, targetElement) {
        const context = core.context;
        context.blockquote = {
            targetButton: targetElement,
            tag: core.util.createElement('BLOCKQUOTE')
        };
    },

    /**
     * @Override core
     */
    active: function (element) {
        if (!element) {
            this.util.removeClass(this.context.blockquote.targetButton, 'active');
        } else if (/blockquote/i.test(element.nodeName)) {
            this.util.addClass(this.context.blockquote.targetButton, 'active');
            return true;
        }
        
        return false;
    },

    /**
     * @Override core
     */
    action: function () {
        const currentBlockquote = this.util.getParentElement(this.selection.getNode(), 'blockquote');

        if (currentBlockquote) {
            this.format.removeBlock(currentBlockquote, null, null, false, false);
        } else {
            this.format.applyBlock(this.context.blockquote.tag.cloneNode(false));
        }
    }
};