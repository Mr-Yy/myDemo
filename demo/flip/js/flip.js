/**
 * flip.js
 * @authors Yanxinyu (yanxinyuu@icloud.com)
 * @date    2015-06-18 10:20:53
 * @version 1.0
 */
var curIndex = 1;
$(function() {

    $("#pr").on("click", prevBlock);
    $("#nt").on("click", nextBlock);
    $(".flip-block").on("animationend", clearClass);
})

function prevBlock() {
	if (curIndex == 1) return false;
    var curBlock = $("#block" + curIndex);
    curBlock.addClass('prev-cur');

    curIndex--;
    var nextBlock = $("#block" + curIndex);
    nextBlock.addClass("prev");
}

function nextBlock() {
	if (curIndex == 5) return false;
    var curBlock = $('#block' + curIndex);
    curBlock.addClass("next-cur");

    curIndex++;
    var nextBlock = $("#block" + curIndex);
    nextBlock.addClass("next");
}

function clearClass(){
	var curBlock = $("#block" + curIndex);
	curBlock.addClass('visible').removeClass("hidden prev-cur prev next-cur next");
	curBlock.siblings("div").addClass('hidden').removeClass('visible prev-cur prev next-cur next')
}
