

var drawChart = function(obj, options, data) {
    obj.highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: ' '
        },
        xAxis: {
            title: {
                text: ''
            },
            min: 0,
            minorGridLineDashStyle: 'dashed',
            minorGridLineWidth: 1,
            minorTickLength: '10',
            minorTickInterval: '30',
            minorGridLineColor: '#ccc',
            gridLineWidth: 1,
            categories: options
        },

        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            minorGridLineDashStyle: 'dashed',
            minorGridLineWidth: 1,
            minorTickLength: '10',
            minorTickInterval: '30',
            minorGridLineColor: '#ccc',
        },
        plotOptions: {
            area: {
                enableMouseTracking: false,
                pointStart: 0,
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0,  Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(.2).get('rgba')],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(.2).get('rgba')]
                    ]
                },
                lineWidth: 5 ,
                lineColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0,  '#4bcff2'],
                        [1, '#2f87de']
                    ]
                },
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
//
        },
        tooltip: {
            enabled: false
        },
        series: [{
            type: 'area',
            data: data
        }]
    });
}

$(function () {



    // 初始化加载
    var showData = function(data, urlSearch) {
        var tempData = {};

        // 设置tab头
        var setTabText = function(urlSerach){
            var func = urlSearch.cmd.func;
            var tabData = {};
            switch (func) {
                case 'registReport':
                    tabData.name = '注册';
                    tabData.count = 1;
                    tabData.func = 'registReport';
                    tabData.cmd =urlSearch.cmd.cmd;
                    break;
                case 'payReport':
                    tabData.name = '投注';
                    tabData.count = 2;
                    tabData.func = 'payReport';
                    tabData.cmd =urlSearch.cmd.cmd;
                    break;
                case 'chargeReport':
                    tabData.name = '充值';
                    tabData.count = 2;
                    tabData.func = 'chargeReport';
                    tabData.cmd =urlSearch.cmd.cmd;
                    break;
                case 'commissionReport':
                    tabData.name = '佣金';
                    tabData.count = 1;
                    tabData.func = 'commissionReport';
                    tabData.cmd =urlSearch.cmd.cmd;
                    break;
                case 'profitReport':
                    tabData.name = '卡券兑换';
                    tabData.count = 1;
                    tabData.func = 'profitReport';
                    tabData.cmd =urlSearch.cmd.cmd;
                    break;

                //default;
            };
            tempData.tabheader = tabData;
        };

        // 设置详细列表
        var setDeatil = function(data) {
            var toFixed = function(str) {
                if (typeof str !== 'number') {
                    str = Number(str);
                }
                return str.toFixed(2);
            };
            var setData = function(data) {
                var result = [];

                for (var i = 0; i < data.dataX.length; i ++) {
                    result.push({});
                }
                $.each(data, function(key, val) {

                    // 人数
                    if (key == 'dataY') {
                        $.each(val, function(i, val) {
                            result[i].number = val;
                        });
                    } else if (key == 'dataY1') {
                        $.each(val, function(i, val) {
                            result[i].number = val;
                        });
                    } else if (key == 'dataY2') {    // 金额
                        $.each(val, function(i, val) {
                            result[i].price = toFixed(val);
                        });
                    } else if (key == 'dataX') {
                        $.each(val, function(i, val) {
                            result[i].date = val;
                        });
                    }
                });
                return result;
            }
            tempData.detail = setData(data);
        };

        var setDataFormat = function(arr) {
            var newArr = [];
            $.each(arr, function(i){
                newArr[i] = '';
            });
            newArr[0] = substrDate(arr.shift());
            newArr[newArr.length-1] = substrDate(arr.pop());
            return newArr;
            function substrDate(date){
                var re = /(\d{2}\-\d{2})$/;
                return re.exec(date)[0];
            }
        }
        if ($.isPlainObject(data)) {

            setTabText();
            setDeatil(data);
            Common.template($('.chart-layout'), 'searchtemp', tempData);
            Common.tab($('.tab-header div'), $('.tab-cont .cont'));
            data.dataX = setDataFormat(data.dataX);
            drawChart($('#chart1'), data.dataX, data.dataY || data.dataY1);

            // 如果是双选
            if (data.dataY2)   drawChart($('#chart2'), data.dataX, data.dataY || data.dataY2);

        } else if (data === false) {
            tempData.notFound = 0;
            Common.template($('.chart-layout'), 'searchtemp', tempData);
        }


    }
    // 加载初始化
    var loadData = function() {
        var city = $('#city').get(0).dataset.city;
        var area = $('#area').get(0).dataset.area;
        var startTime = $('#startTime');
        var endTime = $('#endTime');
        var urlSearch = Common.getUrlData();
        var bBtn = true;
        var areaCode;

        if (bBtn) {
            bBtn = false;
            if (city && area) {
                areaCode = area;
            } else if (city) {
                areaCode = city;
            } else if (urlSearch.city && urlSearch.city.province && urlSearch.city.city){
                areaCode = urlSearch.city.city;
            } else if (urlSearch.city && urlSearch.city.province) {
                areaCode = urlSearch.city.province;
            }
            var msg = {
                areaCode: areaCode,
                startDate: startTime.val(),
                endDate: endTime.val()
            };

            Common.ajax(urlSearch.cmd, msg, function(data) {

                if (data.code === '0000' && data.result) {
                    showData(data.result, urlSearch);
                } else if (data.code === '9001') {        // 没有数据
                    showData(false, urlSearch);
                }
                bBtn = !bBtn;
            });
        } else {

        }


    };

    $('#city').on('touchstart', function(){
        Common.select('top');
    });
    $('#area').on('touchstart', function(){
        Common.select();
    });

    // 时间设置
    var startTime = $('#startTime');
    var endTime = $('#endTime');
    var setTime = Common.setTime();
    setTime.setWeekDate(startTime, endTime);
    $('#weekbtn').on('touchend', function(){
        setTime.setWeekDate(startTime, endTime);
    });
    $('#monthbtn').on('touchend', function(){
        setTime.setMonthDate(startTime, endTime);
    });

    $('.btn-sub').on('touchend', function() {
        loadData();
    });

    loadData();

    $('#startTime').mobiscroll('setVal', startTime.val()).date({
        theme: 'android-holo',     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: 'mixed',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: 'bottom', // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: '',// Specify language like: lang: 'pl' or omit setting to use default
        dateFormat: 'yy-mm-dd',
        dateOrder: 'yymmdd', //面板中日期排列格式
        monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        setText: '确定', //确认按钮名称
        cancelText: '取消',//取消按钮名籍我
        ampmText: '',
        amText: ''
    });
    $('#endTime').mobiscroll('setVal', endTime.val()).date({
        theme: 'android-holo',     // Specify theme like: theme: 'ios' or omit setting to use default
        mode: 'mixed',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
        display: 'bottom', // Specify display mode like: display: 'bottom' or omit setting to use default
        lang: '',// Specify language like: lang: 'pl' or omit setting to use default
        dateOrder: 'yymmdd', //面板中日期排列格式
        dateFormat: 'yy-mm-dd',
        monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        setText: '确定', //确认按钮名称
        cancelText: '取消',//取消按钮名籍我
        ampmText: '',
        amText: '',
    });

});
