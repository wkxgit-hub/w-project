var startX, startY, endX, endY //检测左右划动
var touch_pd = 1 //触摸判断(使能)
var sz_rl = 1 //第二行按钮显示控制
var _data, _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
};

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp(), dataApi = require("../../provider/dataApi.js"), pipe = require("../../provider/pipe.js");

Page({
    data: (_data = {
        title: "全真模拟",
        paperid: "",
        startPoint: [ 0, 0 ],
        curPoint: [],
        statusBarHeight: "",
        titleBarHeight: "",
        show: !1,
        num: 0,
        num_length: 0,
        remainder: 0,
        handpapershow: !1,
        item: {
            total_score: 100,
            pass_score: 60,
            paper_time: 90,
            highest: 0
        },
        timer: null,
        ruletime: "",
        durationtime: "",
        usetime: "",
        index: 0,
        paperdetail: "",
        answerlist: [],
        audiolist: [],
        answerlength: 0,
        isaudio: 1,
        inputHeight: 0,
        exam_type: ""
    }, _defineProperty(_data, "paperid", ""), _defineProperty(_data, "isloading", !1), 
    _data),
    mytouchstart: function(t) {
        this.setData({
            startPoint: [ t.touches[0].pageX, t.touches[0].pageY ]
        });
    },
    mytouchmove: function(t) {
        var a = [ t.touches[0].pageX, t.touches[0].pageY ];
        this.setData({
            curPoint: a
        });
    },
    mytouchend: function(t) {
        var a = [ t.changedTouches[0].pageX, t.changedTouches[0].pageY ], e = this.data.startPoint;
        a[0] - e[0] < 0 ? this.data.index + 1 < this.data.paperdetail.length && this.setData({
            index: this.data.index + 1
        }) : 0 < this.data.index && this.setData({
            index: this.data.index - 1
        });
    },
    bindplay: function(t) {
        console.log(t);
        var a = t.currentTarget.id;
        if (this.data.playIndex) {
            var e = wx.createVideoContext([ "index", this.data.playIndex ].join(""));
            e.seek(0), e.pause(), this.setData({
                playIndex: a
            });
        } else this.setData({
            playIndex: a
        });
        wx.createVideoContext([ "index", this.data.playIndex ].join("")).play(), this.readVideo(a);
    },
    onLoad: function(t) {
        this.setData({
            statusBarHeight: getApp().globalData.statusBarHeight,
            titleBarHeight: getApp().globalData.titleBarHeight,
            item: app.globalData.item,
            ruletime: 60 * app.globalData.item.paper_time
        }), t.exam_type && (this.setData({
            exam_type: t.exam_type
        }), "1" == t.exam_type && this.setData({
            paperid: t.paperid
        }), this.mockExam(t.exam_type)), "2" == t.exam_type && this.setData({
            title: "未做试题"
        }), "3" == t.exam_type && this.setData({
            title: "智能考试"
        }), this.timer(60 * app.globalData.item.paper_time);
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    showTk: function() {
        if (100 < this.data.paperdetail) {
            var t = Math.floor(this.data.paperdetail.length / 100), a = this.data.paperdetail.length % 100;
            console.log(t, a), this.setData({
                num: 100,
                num_length: t,
                remainder: a
            });
        } else this.setData({
            num: this.data.paperdetail
        });
        this.setData({
            show: !0
        });
    },
    onClose: function() {
        this.setData({
            show: !1
        });
    },
    touchStart(e) { //触摸开始
        startX = e.changedTouches[0].clientX
        startY = e.changedTouches[0].clientY
      },
      touchEnd(e) { //触摸结束
        if (touch_pd === 1) {
          var that = this
          endX = e.changedTouches[0].clientX;
          endY = e.changedTouches[0].clientY;
          if (endX - startX < -50 && Math.abs(endY - startY) < 50) { //右滑，下一题
            if (sz_rl === 1) {
              that.goDown()
            }
          } else if (endX - startX  > 50 && Math.abs(endY - startY) < 50) { //左滑，上一题
            if (sz_rl === 1) {
              that.goUp()
            }
          }
        }
      },
    goUp: function() {
        if (0 == this.data.index) return wx.showToast({
            title: "这是第一题",
            icon: "none"
        }), !1;
        this.setData({
            index: this.data.index - 1
        }), this.changepic(this.data.index);
    },
    goDown: function() {
        if (this.data.index + 1 >= this.data.paperdetail.length) return wx.showToast({
            title: "已经是最后一题了",
            icon: "none"
        }), !1;
        this.setData({
            index: this.data.index + 1
        }), this.changepic(this.data.index);
    },
    jumptap: function(t) {
        this.setData({
            index: t.currentTarget.dataset.i,
            show: !1
        }), this.changepic(this.data.index);
    },
    scrolltolower: function(t) {
        this.data.num < this.data.paperdetail.length && (Math.floor(this.data.num / 100) == this.data.num_length ? this.setData({
            num: this.data.num + this.data.remainder
        }) : this.setData({
            num: this.data.num + 100
        }));
    },
    timer: function(t) {
        clearInterval(this.data.timer);
        var a = this, e = t, i = t;
        a.setData({
            durationtime: a.djstimer(i)
        }), this.data.timer = setInterval(function() {
            i--, a.setData({
                durationtime: a.djstimer(i),
                usetime: a.djstimer(e - i)
            }), i <= 0 && (clearInterval(a.data.timer), a.mockexam_submit());
        }, 1e3);
    },
    djstimer: function(t) {
        var a = Math.floor(t / 60 / 60 % 24);
        a = a < 10 ? "0" + a : a;
        var e = Math.floor(t / 60 % 60);
        e = e < 10 ? "0" + e : e;
        var i = Math.floor(t % 60);
        if (i = i < 10 ? "0" + i : i, 0 < a) var s = a + ":" + e + ":" + i; else s = e + ":" + i;
        return s;
    },
    goHandpaper: function() {
        this.setData({
            handpapershow: !0
        });
    },
    Handpaper: function() {
        this.setData({
            handpapershow: !1
        }), this.mockexam_submit();
    },
    goDati: function() {
        this.setData({
            handpapershow: !1
        });
    },
    honClose: function() {
        this.setData({
            handpapershow: !1
        });
    },
    choice: function(t) {
        var a = t.currentTarget.dataset.fjtit, e = t.currentTarget.dataset.option, i = (t.currentTarget.dataset.item, 
        this.data.answerlist), s = 0;
        i[a].choose = e, i.forEach(function(t) {
            2 == t.type ? t.flag && s++ : 4 == t.type ? t.issure && s++ : 5 == t.type ? t.iscomplete && s++ : t.choose && s++;
        }), this.setData({
            answerlist: i,
            answerlength: s
        });
    },
    multipleChoice: function(t) {
        var a = t.currentTarget.dataset.fjtit, e = t.currentTarget.dataset.option, i = (t.currentTarget.dataset.item, 
        this.data.answerlist), s = 0, n = 0;
        i[a].choose.forEach(function(t, a) {
            t.o == e && (t.ischoose ? t.ischoose = !1 : t.ischoose = !0);
        });
        for (var o = 0; o < i[a].choose.length; o++) {
            if (i[a].choose[o].ischoose) {
                s = 1, i[a].flag = !1;
                break;
            }
            s = 0, i[a].flag = !1;
        }
        i.forEach(function(t) {
            2 == t.type ? t.flag && n++ : 4 == t.type ? t.issure && n++ : 5 == t.type ? t.iscomplete && n++ : t.choose && n++;
        }), i[a].flag = 1 == s, this.setData({
            answerlength: n + s,
            answerlist: i
        });
    },
    textInput: function(t) {
        t.currentTarget.dataset.item;
        var a = t.currentTarget.dataset.fjnum, e = t.currentTarget.dataset.inputnum, i = this.data.answerlist;
        i[a].choose[e] = t.detail.value;
        var s = 0;
        this.isempty(i[a].choose) ? i[a].issure = !0 : i[a].issure = !1, i.forEach(function(t) {
            2 == t.type ? t.flag && s++ : 4 == t.type ? t.issure && s++ : 5 == t.type ? t.iscomplete && s++ : t.choose && s++;
        }), this.setData({
            answerlist: i,
            answerlength: s
        });
    },
    vioceChoice: function(t) {
        console.log(t), t.currentTarget.dataset.item;
        var a = t.currentTarget.dataset.fjnum, e = t.currentTarget.dataset.zjnum, i = t.currentTarget.dataset.option, s = this.data.answerlist, n = 0, o = "answerlist[" + a + "].choose[" + e + "].choose";
        this.setData(_defineProperty({}, o, i)), this.isempty(s[a].choose) ? s[a].iscomplete = !0 : s[a].iscomplete = !1, 
        s.forEach(function(t) {
            2 == t.type ? t.flag && n++ : 4 == t.type ? t.issure && n++ : 5 == t.type ? t.iscomplete && n++ : t.choose && n++;
        }), this.setData({
            answerlist: s,
            answerlength: n
        });
    },
    onReady: function() {
        var t = wx.createInnerAudioContext();
        this.setData({
            audioCtx: t
        });
    },
    onHide: function() {
        this.changepic(this.data.index), wx.createVideoContext([ "index", this.data.playIndex ].join("")).pause();
    },
    onUnload: function() {
        this.changepic(this.data.index), wx.createVideoContext([ "index", this.data.playIndex ].join("")).pause();
    },
    mockExam: function(t) {
        var a = this;
        this.setData({
            isloading: !0
        });
        var e = {
            uid: wx.getStorageSync("uid"),
            exam_type: t
        };
        "1" == t && (e.paperid = this.data.paperid), console.log(e), dataApi.mockExam(_extends({}, e)).then(function(t) {
            if (t.data.list.length <= 0) a.setData({
                isloading: !1
            }); else {
                console.log(t);
                var n = [], o = [], r = [];
                t.data.list && (t.data.list.forEach(function(t) {
                    if (2 == t.type) {
                        var a = [];
                        t.option.forEach(function(t) {
                            a.push({
                                o: t.o,
                                ischoose: !1
                            });
                        }), n.push({
                            type: t.type,
                            tid: t.id,
                            issure: !1,
                            flag: !1,
                            choose: a
                        });
                    } else if (4 == t.type) {
                        for (var e = [], i = 0; i < t.rightarray.length; i++) e.push("");
                        n.push({
                            type: t.type,
                            tid: t.id,
                            issure: !1,
                            choose: e
                        });
                    } else if (5 == t.type) {
                        var s = [];
                        t.list.forEach(function(t) {
                            s.push({
                                tid: t.id,
                                choose: ""
                            });
                        }), n.push({
                            type: t.type,
                            tid: t.id,
                            iscomplete: !1,
                            choose: s
                        });
                    } else n.push({
                        type: t.type,
                        tid: t.id,
                        issure: !1,
                        choose: ""
                    });
                    t.qaudio ? o.push({
                        audiosrc: t.qaudio,
                        time: 0
                    }) : o.push({
                        audiosrc: "",
                        time: 0
                    }), 2 == t.a_type ? r.push(t.option) : r.push("");
                }), t.data.list && a.setData({
                    paperdetail: t.data.list,
                    answerlist: n,
                    audiolist: o
                }), t.data.paperid && a.setData({
                    paperid: t.data.paperid
                }), a.setData({
                    isloading: !1
                }));
            }
        }).catch(function(t) {
            a.setData({
                isloading: !1
            }), console.log(t);
        });
    },
    isempty: function(t) {
        var a = new Boolean();
        for (var e in a = !0, t) t[e] || (a = !1);
        return !!a;
    },
    changepic: function(t) {
        this.data.paperdetail.length <= 0 || 0 != this.data.audiolist.length && (!this.data.audiolist[t].url || this.data.audiolist[t].url != this.data.audiolist[t - 1].url && 0 < t) && (this.setData({
            isaudio: 1
        }), this.data.audioCtx.pause());
    },
    myAudioStart: function(t) {
        var a = this.data.audioCtx, e = this, i = this.data.audiolist;
        this.setData({
            isaudio: 2
        }), a.src = t.currentTarget.dataset.src, 0 != i[t.currentTarget.dataset.num].time ? (a.play(), 
        a.seek(i[t.currentTarget.dataset.num].time)) : a.play(), this.currenttime(), this.data.onEnded || (this.data.onEnded = !0, 
        a.onEnded(function() {
            e.setData({
                isaudio: 1,
                currentTime: 0
            }), e.audiotime(t.currentTarget.dataset.src, 0);
        }));
    },
    myAudioPause: function(t) {
        var a = this.data.audioCtx, e = this;
        a.pause(), this.data.onPause || (this.data.onPause = !0, a.onPause(function() {
            a.currentTime, e.setData({
                isaudio: 1
            }), e.audiotime(t.currentTarget.dataset.src, Math.floor(a.currentTime));
        }));
    },
    currenttime: function(t) {
        var a = this.data.audioCtx;
        setTimeout(function() {
            a.currentTime, a.onTimeUpdate(function() {});
        }, 100);
    },
    audiotime: function(a, e) {
        this.data.audiolist.forEach(function(t) {
            t.url == a && (t.time = e);
        });
    },
    mockexam_submit: function() {
        var a = this, t = this.data.answerlist, s = [];
        t.forEach(function(t) {
            if (1 == t.type || 3 == t.type) s.push({
                tid: t.tid,
                type: t.type,
                answer: t.choose
            }); else if (2 == t.type) {
                var a = [];
                t.choose.forEach(function(t) {
                    t.ischoose && a.push(t.o);
                }), s.push({
                    tid: t.tid,
                    type: t.type,
                    answer: a
                });
            } else if (4 == t.type) {
                var e = [];
                t.choose.forEach(function(t) {
                    e.push("【" + t + "】");
                }), e = e.join(","), s.push({
                    tid: t.tid,
                    type: t.type,
                    answer: e
                });
            } else {
                var i = [];
                t.choose.forEach(function(t) {
                    i.push({
                        tid: t.tid,
                        answer: t.choose
                    });
                }), s.push({
                    tid: t.tid,
                    type: t.type,
                    answer: i
                });
            }
        }), dataApi.mockexam_submit({
            uid: wx.getStorageSync("uid"),
            exam_type: this.data.exam_type,
            paperid: this.data.paperid,
            answerdata: JSON.stringify(s),
            usetime: this.data.usetime
        }).then(function(t) {
            console.log(t), t.data.resuser && (app.globalData.resuser = t.data.resuser, wx.redirectTo({
                url: "../result/result?paperId=" + a.data.paperid
            }));
        }).catch(function(t) {
            console.log(t);
        });
    }
});