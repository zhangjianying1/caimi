/**
 * Common 组件
 * @param {Object}
 * @returns {Object}
 */
var Common = (function(Common){
    Common = {
        getUrlData: function(){
            var search = location.search.substring(1);
            var arr = search.split('&');
            var oCmd = {};
            var oCity = {};
            var managerCode = '';
            $.each(arr, function(i, val) {
                if (/func/.test(val)) {
                    oCmd.func = val.substring(5);
                }
                if (/cmd/.test(val)) {
                    oCmd.cmd = val.substring(4);
                }
                if (/province/.test(val)) {

                    oCity.province = val.substring(9);
                }
                if (/city/.test(val)) {
                    oCity.city = val.substring(5);
                }
                if (/managerCode/.test(val)) {
                    managerCode = val.substring(12);
                }
            });
            return {
                cmd: oCmd,
                city: oCity,
                managerCode: managerCode
            };

        },
        showLayer: function(selector, html){

            var viewArr = [];
            createView(selector, html);
            createView('.mask');
            // 设置显示层的index
            setViewIndex(viewArr, selector);

            // 点击遮罩层关闭最后弹出的弹出层
            $(document).on('touchend', '.mask', function() {
                if (viewArr.length < 2) {
                    $(this).hide();
                }
                $(viewArr.pop()).hide();
            });
            function createView(selector, html) {
                var obj = $(selector);

                //如果不存在
                if (obj.length === 0) {
                    $('body').append('<div class="' + selector.substring(1) + '">');
                } else {
                    obj.show();
                }

                if (html) {
                    $(selector).html(html);
                }
            }
            /**
             * 设置显示层的层级 倒序排列
             * @param arr {Array}
             * @param str {String}
             */
            function setViewIndex(arr, str) {
                $.each(arr, function(i, val) {
                    if (val == str) {
                        arr.splice(i, 1);
                    }
                });
                arr.push(str);
            }
        },
        hideLayer: function(selector) {
            $(selector).hide();
            $('.mask').hide();
        },
        ajax: function(data, param, fn) {

            var urlSearch = Common.getUrlData();

            var msg = {
                managerCode: urlSearch.managerCode
            };

            msg = $.extend(msg, param, true);

            data.msg = JSON.stringify(msg);
            $.ajax({
                url: '/h5Interface',
                type: 'POST',
                dataType:'json',
                data: data,
                beforeSend: function(){
                   $('.loading').show();
                },
                success: function(data){
                    $('.loading').hide();
                    fn(data);
                }
            });
        },
        /**
         * select选择
         * @param obj
         * @param param
         */
        select: function(top){
            var data = Common.getUrlData();
            var province = '';
            var city = '';
            var html = '';

            var resolveData = function(data) {

                data = data.resultBeanList;

                // 顶级查询
                if (top) {
                    $.each(data, function(i, val) {
                        html += '<li data-city="' + val.cityCode + '">' + val.cityName + '</li>';
                    });
                    Common.showLayer('.view-select-confirm', '<ul class="select-list">' + html + '</ul>');

                } else {
                    var city = $('#city')[0].dataset.city;

                    // 如果用户已经选择顶级
                    if (city) {
                        $.each(data, function(i, val) {
                            if (val.cityCode === city) {
                                $.each(val.childList, function(i, val) {
                                    html += '<li data-area="' + val.areaCode + '">' + val.areaName + '</li>';
                                });
                            }
                        });
                        Common.showLayer('.view-select-confirm', '<ul class="select-list">' + html + '</ul>');
                    }
                }
            };

            Common.ajax({cmd: '9101', func: 'areaInfo'}, data.city, function(data){
                if (data.code === '0000' && data.result) {
                    resolveData(data.result);
                }
            });

            $(document).on('touchstart', '.select-list li', function(){
               var city = this.dataset.city;
               var area = this.dataset.area;

                if (city) {
                    $('#city').html(this.innerHTML).attr('data-city', city);
                    Common.hideLayer('.view-select-confirm');
                } else if (area) {
                    $('#area').html(this.innerHTML).attr('data-area', area);
                    Common.hideLayer('.view-select-confirm');
                }
            });
        },
        setTime: function() {

            var handler = {
                fillZero: function(val){
                    if (val < 10) {
                        val = '0' + val;
                    }
                    return val;
                },
                setWeekDate: function(start, end) {
                    var oDate = new Date();

                    end.val(oDate.getFullYear() + '-'+ handler.fillZero(oDate.getMonth() + 1) + '-' + handler.fillZero(oDate.getDate()));
                    oDate.setTime(oDate.getTime() - 6 * 86400000);
                    start.val(oDate.getFullYear() + '-'+ handler.fillZero(oDate.getMonth() + 1) + '-' + handler.fillZero(oDate.getDate()));
                },
                setMonthDate: function(start, end) {
                    var oDate = new Date();

                    end.val(oDate.getFullYear() + '-'+ handler.fillZero(oDate.getMonth() + 1) + '-' + handler.fillZero(oDate.getDate()));
                    oDate.setTime(oDate.getTime() - 29 * 86400000);
                    start.val(oDate.getFullYear() + '-'+ handler.fillZero(oDate.getMonth() + 1) + '-' + handler.fillZero(oDate.getDate()));
                },
                inputFormat: function(val){

                },
                inputMaxTime: function() {

                }
            };
            return handler
        },
        tab: function(tabs, conts, fn) {
            var index = '';


            tabs.on('touchend', function(){
                var This = $(this);
                var index = This.index();
                This.children().addClass('active');
                This.siblings().children().removeClass();
                conts.hide();
                conts.eq(index).show();
            })

        },
        template: function(obj, tempObj, data){
            var tel = template(tempObj, data);
            obj.html(tel);
        }
    };

    return Common;
}(Common || {}));