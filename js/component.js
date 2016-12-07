/**
 * Created by ASSOON on 2016/12/7.
 */
var icon = ['icon_gift_g', 'icon_ice', 'icon_sweet', 'icon_jewel', 'icon_gift', 'icon_heart'];
var fn = function () {
    //播放直播视频
    this.player = function () {
        var option = {
            "live_url": "http://5219.liveplay.myqcloud.com/live/5219_205.flv?roomid=GWdIRS0eSvg=",
            "live_url2": "http://5219.liveplay.myqcloud.com/live/5219_205.flv?roomid=GWdIRS0eSvg=",
            "width": $(window).width(),
            "height": $(window).height()
            //...可选填其他属性
        };

        var player = new qcVideo.Player("id_video_container", option);
        //消息
        var iminfo = {
            logininfo: {
                sdkAppID: '1400018727',//用户标识接入SDK的应用ID，必填
                appIDAt3rd: '1400018727',//和sdkAppID一样
                accountType: '8664',//账号类型，必填
                identifier: '70', //用户帐号，选填600034
                identifierNick: '小冉', //用户昵称，选填
                userSig: 'eJxljlFPgzAYRd-5FYRXjbbdKsXEBzeXSTKyqIMleyFlfLCOFZrSDYbxv*twiSTe13Nu7v20bNt2VouPO77dVsfSxOaswLEfbQc5t39QKZHG3MQjnf6D0CqhIeaZAd1DTCklCA0dkUJpRCauhjtkdVrE-cBvefzTxMwl7lAReQ*DWTj136bdJkyW8jRnmx0UDdm9g9eduxd*BMLVvA0mryEWNJppnvv5c4MT35OL4qGUN8m9gryFg6zWxdLzgv1B15HcNxHLJuv8aTBphITrIYa8MaGMDegJdC2qshcIwhSTEbrEsb6sbymkXWI_' //鉴权Token，identifier不为空时，userSig必填 eJxljktPg0AURvf8iglrowMMD01cINIWaG2ibaluyMgMePsYEKbYYvzvIjaRxLs9J-c7nwpCSF1Mny5pmhYHIRN5KrmKbpCK1Ys-WJbAEioTo2L-ID*WUPGEZpJXPdRM09QxHjrAuJCQwdmwOmqQAa-ZNulHfh*Qjmum4VwPFch7OPOXXnCfP4-Wwh7H84O2ivx2HaXpZrajD9virQhcKmoiiP2y8OSjC7575Z2c0WQHNnttaBjPo7gNp*3kGKwsPVze5c14k70Tf5*Rj9vBpIQ9PwfZFnZsYgyDGl7VUIhe0LtcTTfwz6nKl-INsopctg__
            },
            groupid: '205',
            showTextMsg: function (text, msg) {
                if (text == '') {
                    return;
                }
                var username = msg.fromAccountNick;
                var liobj = '<li class="im-item"><span class="username">' + username + '：</span><span class="msgcontent">' + text + '</span></li>';

                if (msg.fromAccount != msg.fromAccountNick && msg.fromAccountNick.indexOf('@@TLS#') >= 0) {
                    username = '[系统消息]';
                    liobj = '<li class="im-item im-system-msg"><span class="username">' + username + '：</span><span class="msgcontent">' + text + '</span></li>';
                }
                if (msg.getIsSend()) {
                    //自己发送
                    liobj = '<li class="im-item im-isSelfSend"><span class="username">' + username + '：</span><span class="msgcontent">' + text + '</span></li>';
                }

                $(liobj).appendTo('.live-im-list');
                $('.live-content-im')[0].scrollTop = $('.live-content-im')[0].scrollHeight
            },
            showOnline: function (online) {
                $('.live-video-online').html(online);
            }
        };

        //初始化
        liveim.login(iminfo);

    };
    //显示消息
    this.showListInfo = function () {
        var maxDisplayMsgCount = 6;
        var opacityStep = 0.2;
        var opacity;
        var colors = ['color_r', 'color_g', 'color_b'];
        var childrenLiList = $("#video_sms_list").children();
        if (childrenLiList.length == maxDisplayMsgCount) {
            $("#video_sms_list").children().first().remove();
            for (var i = 0; i < maxDisplayMsgCount; i++) {
                opacity = opacityStep * (i + 1);
                $('#video_sms_list').children().eq(i).css("opacity", opacity);
            }
        }
        //写入消息
        $('#video_sms_list').append('<li><span class="' + colors[1] + '">ad**sa 游客来了</span></li>');
    };
    //点赞动画
    this.clickGood = function () {
        $('.click_good .icon_good').on('touchend', function () {
            cloudMail.showListInfo();
            $('.click_good .icon_good').append($('<div class="animated bounceInUp icon good_icon"></div>').addClass(icon[Math.floor(Math.random() * 6)]));
//                    <div class="animated bounceInUp icon icon_heart good_icon"></div>
        })
    };
    //继承ajax方法
    ajax.call(this, '');
    //购物车
    this.shoppingCar = function () {
        var maxCount = 0;
        //调用购物车请求
        cloudMail.getShopCarList(null);
        var clickBox = $(".shopcar .list-container");
        //计算总数
        var toltal = function () {
            var sumCount =0;
            var sumMoney = 0;
            $('.shopcar .list-container .icon_nochoice').each(function (index,child) {
                if($(child).hasClass('icon_choide')){
                    sumMoney += parseFloat($(child).parents('.shopcar_list').find('.price').text())*parseFloat($(child).parents('.shopcar_list').find('input').val());
                    sumCount += parseInt($(child).parents('.shopcar_list').find('input').val());
                }
            });
            $('.sumTotal').text(sumMoney.toFixed(2));
            $('.sumCount').text(sumCount);
        };
        //选择或者取消商品
        clickBox.on('touchend','.shopcar .list-container .icon_nochoice',function () {
                $(this).toggleClass('icon_choice');
        });
        //点击删除
        clickBox.on('touchend','.shopcar .list-container .icon_delet',function () {
            $.confirm('确定要删除吗?', function () {

            });
        });
        //减少商品
        clickBox.on('touchend','.shopcar .list-container .icon_reduce',function () {
            var attrData = JSON.parse($(this).siblings('input').attr('data-value'));
            var value = $(this).siblings('input').val();
            value --;
            value = value<1?1:value;
            $(this).siblings('input').val(value);
            //计算数量
            toltal();

        });
        //增加商品
        clickBox.on('touchend','.shopcar .list-container .icon_add',function () {
            var attrData = JSON.parse($(this).siblings('input').attr('data-value'));
            maxCount = attrData.gstock;
            var value = $(this).siblings('input').val();
            value ++;
            value = value>maxCount?maxCount:value;
            $(this).siblings('input').val(value);
            toltal();
        });
        //全部选择
        $('.nav_footer .choice_btn .icon_nochoice').on('touchend',function () {
            var sumCount =0;
            var sumMoney = 0;
            $(this).toggleClass('icon_choice');
            if($(this).hasClass('icon_choice')){
                $('.shopcar .list-container .icon_nochoice').each(function (index,child) {
                    $(child).addClass('icon_choice');
                    sumMoney += parseFloat($(child).parents('.shopcar_list').find('.price').text())*parseFloat($(child).parents('.shopcar_list').find('input').val());
                    sumCount += parseInt($(child).parents('.shopcar_list').find('input').val());
                    });
                    $('.sumTotal').text(sumMoney.toFixed(2));
                    $('.sumCount').text(sumCount);
            }else {
                $('.shopcar .list-container .icon_nochoice').each(function (index,child) {
                    $(child).removeClass('icon_choice');
                    $('.sumTotal').text(0);
                    $('.sumCount').text(0);
                });
            }
        });
    }
};
//初始化页面
fn.prototype.initPage = function () {
    $('.float_box #send').on('touchend', function () {
        $.init();
        console.info(cloudMail.infoBody({type: 1000, content: $('#speek').val()}));
        //liveim.send(cloudMail.infoBody({type:1000,content:$('#speek').val()}))
    });
    var mySwiper2 = new Swiper('#swiper-container2', {
        slidesPerView: 2,
        onTap: function () {
            mySwiper3.slideTo(mySwiper2.clickedIndex);
        }
    });
    $('.swiper-no-swiping').on('touchend', function () {
        mySwiper3.slideTo($(this).index());
        $('.swiper-no-swiping').removeClass('active');
        $(this).addClass('active');
    });
    //  点击弹出购物窗口
    $('.click_good .icon_more').on('touchend', function () {
        $('.live .goods_box').css('bottom', '0');
        //点击时调用加载全部商品方法
        cloudMail.getAllList();
    });
    //关闭弹出窗
    $('.float_box .close').on('touchend', function (e) {
        $('.live .goods_box').css('bottom', '-20rem')
    });
    var mySwiper3 = new Swiper('#swiper-container3', {
        speed: 500,
        onSlideChangeStart: function () {
            updateNavPosition()
        }
    });

    function updateNavPosition() {
        $('#swiper-container2 .active').removeClass('active');
        var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active');

        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > mySwiper2.activeIndex) {
                console.log(2);
                var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1;
                mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
            }
            else {
                mySwiper2.slideTo(activeNav.index())
            }
        }
    }
};
//下拉加载数据
fn.prototype.pager = function (listContainer, htmlContent, pageCount) {

    //图片延时加载（插件修改过）
    echo.init({
        container: $(listContainer)[0],
        offsetVertical: 150,
        throttle: 260,
        unload: false,
        callback: function (element, op) {
            console.log(element, 'has been', op + 'ed')
        }
    });
    // 加载flag
    var loading = false;
    // 最多可加载的条目
    function addItems() {
        // 添加新条目
        $(listContainer).find('.list-container').append(htmlContent);
    }

    //首次加载
    addItems();
    // 注册'infinite'事件处理函数
    $(document).on('infinite', listContainer, function () {
        alert(4100);
        // 如果正在加载，则退出
        if (loading) return;
        // 设置flag
        loading = true;
        if (pageCount >= $(listContainer).find('.list-container').length) {
            // 重置加载flag
            loading = false;
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            $.detachInfiniteScroll($('.infinite-scroll'));
            // 删除加载提示符
            $('.infinite-scroll-preloader').remove();
            return;
        }
        // 添加新条目
        alert('滚动加载');
        //容器发生改变,如果是js滚动，需要刷新滚动
        $.refreshScroller();
    });
};


//ajax方法
var ajax = function () {
    this.initAjax = function (url, type, postdata, fn) {
        $.ajax({
            type: type,
            url: url,
            data: postdata,
            dataType: 'json',
            timeout: 300,
            success: function (result) {
                fn.call(this, result);
            },
            error: function (result) {
                fn.call(this, result);
            }
        })

    };
    //获取边看边买列表
    this.getAllList = function (pData) {
        this.initAjax('json/allList.json', 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.data;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li class="push_store look_buy"><div class="row gutter"><div class="col-33">' +
                        '<img src="' + listData[i].goodsImg + '" width="100%"></div><div class="col-66"><div class="discrip">' + listData[i].goodsName +
                        '</div><div class="pull-left"><div class="count">' + listData[i].goodsStock + '</div>' +
                        '<div class="much">￥' + listData[i].goodsPrice + '</div></div><div class="pull-right"><span class="icon-shopcar"></span></div></div></div></li>';
                }
                cloudMail.pager('.infinite-scroll-bottom', html);
            }
        })
    };
    //获取购物车列表
    this.getShopCarList = function (pData) {
        this.initAjax('json/shoppingCarList.json', 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.cart_list;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li class="shopcar_list"><i class="icon icon_nochoice in_left"></i><div class="row"><div class="col-33">' +
                        '<img src="img/push_image.jpg" width="100%"></div><div class="col-66"><div class="discrip">' + listData[i].gname +
                        '</div><div class="monney"><span>' + listData[i].goodsattrval + '</span><span class="pull-right">￥<span class="price">' + listData[i].gprice + '</span></span></div><div class="operate clearfix">' +
                        '<div class="pull-left clearfix"><i class="calculate pull-left icon icon_reduce"></i><input class="pull-left text-center" value="0" type="number" data-value='+JSON.stringify(listData[i])+' placeholder="" />' +
                        '<i class="calculate pull-left icon icon_add"></i></div><div class="icon pull-right icon_delet"></div></div></div></div></li>';
                }
                $('#shoppingCar').find('.list-container').html(html);
            }
        })
    };
};
var cloudMail = new fn;
// 处理页面加载的方法
cloudMail.initPage();
cloudMail.clickGood();
//清除点赞dom
setInterval(function () {
    $('.click_good .icon_good').children().remove()
}, 20000);

//直播页面
$(document).on("pageInit", "#pageIndex", function (e, id, page) {
    cloudMail.initPage();
    cloudMail.clickGood();
});
//购物车
$(document).on("pageInit", "#shoppingCar", function (e, id, page) {
    cloudMail.shoppingCar()
});
$.init();