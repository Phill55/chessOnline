"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Philipp on 19.03.2017.
 */
var GameState;
(function (GameState) {
    GameState[GameState["NORMAL"] = 0] = "NORMAL";
    GameState[GameState["CHECK_BLACK"] = 1] = "CHECK_BLACK";
    GameState[GameState["CHECK_WHITE"] = 2] = "CHECK_WHITE";
    GameState[GameState["CHECKMATE"] = 3] = "CHECKMATE";
})(GameState = exports.GameState || (exports.GameState = {}));
