/**
 * 多级联动
 * @authors Yanxinyu (yanxinyuu@icloud.com)
 * @date    2015-06-24 14:13:17
 * @version 0.1
 * @param   sets 参数设置
 *          lv1Id,lv2Id,lv3Id: 分别为选择器中data-select-id的值；
 *          val1,2,3: 分别为每级选择器需要的变量名
 *          defaultStr1,2,3: 分别为选择器默认值;
 */
$(function() {
    $(".container").selects({
        lv1Id: "level1",
        lv2Id: "level2",
        lv3Id: "level3"
    });
})
$.fn.selects = function(sets) {
    //初始化
    sets = $.extend({
        url: "js/select.json",
        lv1Id: "",
        lv2Id: "",
        lv3Id: "",
        val1: "val1",
        val2: "val2",
        val3: "val3",
        defaultStr1: "<option>请选择</option>",
        defaultStr2: "<option>请选择</option>",
        defaultStr3: "<option>请选择</option>"
    }, sets);

    var lv1 = $("select[data-select-id=" + sets.lv1Id + "]"),
        lv2 = $("select[data-select-id=" + sets.lv2Id + "]"),
        lv3 = $("select[data-select-id=" + sets.lv3Id + "]");
    var list;

    //获取数据
    $.getJSON("js/select.json", function(json) {
        list = json;
        init();
    });
    //设置一级菜单
    function init() {
        var insertStr = sets.defaultStr1;
        $.each(list[sets.lv1Id], function(index, value) {
            insertStr += "<option value=\"" + value[sets.val1] + "\">" + value[sets.val1] + "</option>";
        });
        lv1.html(insertStr);

        lv1.on("change", function() {
            setSecond();
        });
    };
    //设置二级菜单
    function setSecond() {
        var firstIndex = lv1.get(0).selectedIndex;
        firstIndex--;
        //判断是否存在下一级菜单
        if (!list[sets.lv1Id][firstIndex][sets.lv2Id]){
        	lv2.attr("disabled", true);
        	lv2.html("");
        	lv3.attr("disabled", true);
        	lv3.html("");
        	return;
        }else{
        	lv2.attr("disabled", false);
        }
        //添加标签
        var insertStr = sets.defaultStr2;
        $.each(list[sets.lv1Id][firstIndex][sets.lv2Id], function(index, value) {
            insertStr += "<option value=\"" + value[sets.val2] + "\">" + value[sets.val2] + "</option>";
        })
        lv2.html(insertStr);

        lv2.on("change", function() {
            setThird();
        });
    };
    //设置三级菜单
    function setThird() {
        var firstIndex = lv1.get(0).selectedIndex,
            secondIndex = lv2.get(0).selectedIndex;
        firstIndex--;
        secondIndex--;
        //判断是否存在下一级菜单
        if (!list[sets.lv1Id][firstIndex][sets.lv2Id][secondIndex][sets.lv3Id]){
        	lv3.attr("disabled", true);
        	lv3.html("");
        	return;
        }else{
        	lv3.attr("disabled", false);
        }
        //添加标签
        var insertStr = sets.defaultStr3;
        $.each(list[sets.lv1Id][firstIndex][sets.lv2Id][secondIndex][sets.lv3Id], function(index, value) {
            insertStr += "<option value=\"" + value[sets.val3] + "\">" + value[sets.val3] + "</option>";
        })
        lv3.html(insertStr);
    }
}
